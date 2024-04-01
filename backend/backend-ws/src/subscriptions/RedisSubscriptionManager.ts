// import {
//     deleteChat,
//     enrichMessages,
//     postChat,
//     updateLatestMessage,
//     updateLatestMessageGroup,
//   } from "@coral-xyz/backend-common";
//   import type {
//     MessageKind,
//     MessageMetadata,
//     SubscriptionType,
//     ToPubsub,
//   } from "@coral-xyz/common";
//   import { CHAT_MESSAGES, DELETE_MESSAGE } from "@coral-xyz/common";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

import { REDIS_URL } from "../config";
import { Redis } from "../redis/Redis";
import type { User } from "../users/User";
import { deleteChatMessage } from "../db/deleteChatMessage";
import { sendMessage } from "../db/sendMessage";
import { updateLatestMessage } from "../db/updateLatestMessage";
import { updateLatestMessageGroup } from "../db/updateLatestMessageGroup";

console.log('Handle__message__function__called__twice__here');

function handleMessago() {
    let isMessageSent = true;
    if (isMessageSent) {
        isMessageSent = false
    }
    console.log('Handling same info user__')
}

type SubscriptionType = 'INDIVIDUAL' | 'GROUP';

export class RedisSubscriptionManager {
    private static instance: RedisSubscriptionManager;
    private subscriber: RedisClientType;
    public publisher: RedisClientType;
    private subscriptions: Map<string, string[]>;
    private reverseSubscriptions: Map<string, { [userId: string]: User }>;
    private postSubscriptions: Map<
        string,
        { user1: string; user2: string } | boolean
    >;
    private constructor() {
        this.subscriber = createClient({
            url: REDIS_URL,
        });
        this.publisher = createClient({
            url: REDIS_URL,
        });
        this.publisher.connect();
        this.subscriber.connect();
        this.subscriptions = new Map<string, string[]>(); // id:room
        this.reverseSubscriptions = new Map<string, { [userId: string]: User }>();
        this.postSubscriptions = new Map<
            string,
            { user1: string; user2: string } | boolean
        >();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisSubscriptionManager();
        }
        return this.instance;
    }

    subscribe(user: User, room: string) {
        this.subscriptions.set(user.userId, [
            ...(this.subscriptions.get(user.userId) || []),
            room,
        ]);
        this.reverseSubscriptions.set(room, {
            //may be considering both individual and group chat
            ...(this.reverseSubscriptions.get(room) || {}),
            [user.userId]: user,
        });

        if (Object.keys(this.reverseSubscriptions.get(room) || {})?.length === 1) {
            console.log(`subscribing message from ${room}`);
            //@ts-ignore
            this.subscriber.subscribe(room, (payload: unknown) => {
                try {
                    console.log('###### Message Received FROM REDIS__PUBSUB___ ########')
                    //@ts-ignore
                    const parsedPayload: any = JSON.parse(payload);
                    const subscribers = this.reverseSubscriptions.get(room) || {};
                    Object.values(subscribers).forEach((user) =>
                        user.send(parsedPayload)
                    );
                } catch (e) {
                    console.error("erroneous payload found?");
                }
            });
        }
    }

    unsubscribe(userId: string, room: string) {
        this.subscriptions.set(
            userId,
            this.subscriptions.get(userId)?.filter((x) => x !== room) || []
        );
        if (this.subscriptions.get(userId)?.length === 0) {
            this.subscriptions.delete(userId);
        }
        delete this.reverseSubscriptions.get(room)?.[userId];
        if (
            !this.reverseSubscriptions.get(room) ||
            Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
        ) {
            this.subscriber.unsubscribe(room);
            this.reverseSubscriptions.delete(room);
        }
    }

    postSubscribe(
        userId: string,
        type: SubscriptionType,    // INDIVIDUAL || COLLECTION
        room: string,
        roomValidation: { user1: string; user2: string } | boolean
    ) {
        this.postSubscriptions.set(`${type}-${room}`, roomValidation);
        console.log(this.postSubscriptions, 'this.postSubsriptions');
    }

    postUnsubscribe(userId: string, type: SubscriptionType, room: string) {
        this.postSubscriptions.delete(`${type}-${room}`);
    }

    userLeft(userId: string) {
        const userSubscriptions = this.subscriptions.get(userId);
        userSubscriptions?.forEach((room) => this.unsubscribe(userId, room));
    }
    async deleteChatMessage(
        type: SubscriptionType,
        room: string,
        client_generated_uuid: string,
        messageId: string
    ) {

        const message = await deleteChatMessage(room, client_generated_uuid, messageId,);

        const roomValidation =
            this.postSubscriptions.get(`${type}-${room}`) ?? null;

        const emittedMessage = message;
        // const emittedMessage = { room, client_generated_uuid };
        console.log({ emittedMessage });

        if (type === "INDIVIDUAL") {
            console.log('Deleting_individual_message_from_server');
            console.log({ roomValidation });
            //@ts-ignore
            this.publish(`INDIVIDUAL_${roomValidation?.user2}`, {
                type: `DELETE_MESSAGE`,
                payload: emittedMessage,
            });
            //@ts-ignore
            this.publish(`INDIVIDUAL_${roomValidation?.user1}`, {
                type: 'DELETE_MESSAGE',
                payload: emittedMessage,
            });
        } else {
            this.publish(`COLLECTION_${room}`, {
                type: `DELETE_MESSAGE`,
                payload: emittedMessage,
            });
        }
    }
    async addChatMessage(
        userId: string,
        type: string,
        room: string,
        msg: {
            client_generated_uuid: string;
            user1_last_read_message: string;
            user2_last_read_message: string;
            publicKey: string;
            sender: string;
            message: string;
            messageKind: string;
        }
    ) {
        //@ts-ignore
        const roomValidation: any = this.postSubscriptions.get(`${type}-${room}`);

        console.log({ roomValidation }, 'room__validation__inside__chat__messages');

        if (!roomValidation) {
            console.log(`User ${userId} hasn't post subscribed to room number ${userId}, type: ${type}`);
            return;
        }

        //TODO: bulkify this
        const messageId = await sendMessage({
            client_generated_uuid: msg.client_generated_uuid,
            room: room,
            type: type,
            message: msg.message,
            message_kind: msg.messageKind,
            user1_last_read_message: msg.user1_last_read_message,
            user2_last_read_message: msg.user2_last_read_message,
            publicKey: msg.publicKey,
            sender: msg.sender,
        });

        if (type === "INDIVIDUAL") {
            await updateLatestMessage(
                room,
                messageId,
                msg.messageKind,
                userId,
                roomValidation,
                msg.client_generated_uuid
            )
        } else {
            await updateLatestMessageGroup(
                room,
                '222222888888',
                msg.messageKind,
                //@ts-ignore
                userId,
                msg.client_generated_uuid,
            )
        }

        const emittedMessage = {
            client_generated_uuid: msg.client_generated_uuid,
            room: room,
            type: type,
            message: msg.message,
            message_kind: msg.messageKind,
            user1_last_read_message: msg.user1_last_read_message,
            user2_last_read_message: msg.user2_last_read_message,
            publicKey: msg.publicKey,
            sender: msg.sender,
        }

        if (type === "INDIVIDUAL") {
            this.publish(`INDIVIDUAL_${roomValidation?.user2}`, {
                type: `CHAT_MESSAGE`,
                payload: {
                    messages: [emittedMessage],
                },
            });
            this.publish(`INDIVIDUAL_${roomValidation?.user1}`, {
                type: `CHAT_MESSAGE`,
                payload: {
                    messages: [emittedMessage],
                },
            });
        } else {
            this.publish(`COLLECTION_${room}`, {
                type: `CHAT_MESSAGE`,
                payload: {
                    messages: [emittedMessage],
                },
            });
        }

        // Redis getInstance() has some error uncommenting it 
        // setTimeout(async () => {
        //     await Redis.getInstance().send(
        //         JSON.stringify({
        //             type: "message",
        //             payload: {
        //                 type: type,
        //                 room: room,
        //                 client_generated_uuid: msg.client_generated_uuid,
        //             },
        //         })
        //     );
        // }, 1000);

    }

    publish(room: string, message: any) {
        console.log(`publishing message to ${room}`);
        this.publisher.publish(room, JSON.stringify(message));
    }

}
