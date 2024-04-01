import { getMessageFromId } from "../db/getMessageInfo";
import { validateRoom } from "../db/validateRoom";
import { RedisSubscriptionManager } from "../subscriptions/RedisSubscriptionManager";
import type { WebSocket } from 'ws';

const WS_READY = 'WS_READY';

interface m {
    client_generated_uuid: string;
    user1_last_read_message: string;
    user2_last_read_message: string;
    publicKey: string;
    sender: string;
    message: string;
    messageKind: string;
}
interface Msgpayload {
    type: 'CHAT_MESSAGE' | 'DELETE_MESSAGE' | 'SUBSCRIBE';
    payload: {
        room: string;
        type: 'INDIVIDUAL' | 'GROUP';
        messages: m[]
    }
}

type SubscriptionType = 'INDIVIDUAL' | 'GROUP';

type Subscription = {
    type: SubscriptionType;
    room: string;
}

type FromServer = {
    type: string;
    payload: object
}

enum MESSAGE_TYPE {
    CHAT_MESSAGE = 'CHAT_MESSAGE',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    SUBSCRIBE = 'SUBSCRIBE'
}

// checks whether the media url or any relevant
// url sent to server is valid or not surfacely
function isValidURL(str: string): boolean {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
        "i"
    )
    return !!pattern.test(str)
};

export class User {
    jwt: string;
    userId: string;
    ws: WebSocket;
    subscriptions: Subscription[] = [];

    constructor(jwt: string, userId: string, ws: WebSocket) {
        this.jwt = jwt;
        this.userId = userId;
        this.ws = ws;
        this.initHandlers();
    }

    private async initHandlers() {
        this.ws.on("message", async (data: string) => {
            // TODO: add rate limiting
            try {
                const message: Msgpayload = JSON.parse(data);
                console.log({ message }, '### Message sent from client ###');
                await this.handleMessage(message);
            } catch (e) {
                console.log("Couldnot parse the message" + e);
            }
        });
        this.send(
            { type: WS_READY, payload: {} }
        );
        console.log('Triggering subscribe')
        RedisSubscriptionManager.getInstance().subscribe(
            this,
            `INDIVIDUAL_${this.userId}`
        )
    }

    private async handleMessage(message: Msgpayload) {
        switch (message.type) {

            case MESSAGE_TYPE.CHAT_MESSAGE:
                const subscriptions = this.subscriptions.map((x) =>
                    x.room === message.payload.room &&
                    x.type === message.payload.type
                );
                console.log({ subscriptions }, 'first__attempt__to__subscriptions');
                if (!subscriptions.length) {
                    await this.validateOwnership(
                        message.payload.room,
                        message.payload.type
                    );
                    const subscriptions = this.subscriptions.map((x) =>
                        x.room === message.payload.room &&
                        x.type === message.payload.type
                    )
                    console.log({ subscriptions }, 'retried__attempt__to__subscriptions');
                    if (!subscriptions.length) {
                        console.log('User is sending erroneous message from client side');
                        console.log('Blocking connection');
                        return;
                    }
                };

                console.log(' $$$ Passed__all__the__test $$$');

                message.payload.messages.map((m: m) =>
                    RedisSubscriptionManager.getInstance().addChatMessage(
                        this.userId,
                        message.payload.type,
                        message.payload.room,
                        m
                    )
                )

            case MESSAGE_TYPE.DELETE_MESSAGE:
                console.log('##DELETE__MESSAGE__CALLED##')
                //TODO: merge the subscription section into a single fn
                const subscription2 = this.subscriptions.find(
                    (x) =>
                        x.room === message.payload.room && x.type === message.payload.type
                );
                if (!subscription2) {
                    await this.validateOwnership(
                        message.payload.room,
                        message.payload.type,
                    );
                    const updatedSubs = this.subscriptions.find(
                        (x) =>
                            x.room === message.payload.room && x.type === message.payload.type
                    );
                    if (!updatedSubs) {
                        console.log(
                            `User has not yet post subscribed to the room ${message.payload.room}`
                        );
                        return;
                    }
                }
                const messageToDelete: any = await getMessageFromId(
                    // @ts-ignore
                    message.payload?._id
                );
                if (!messageToDelete) {
                    console.error(
                        // @ts-ignore
                        `Someone sending errorneous input sending uuid ${message.payload?._id} for ${message.payload?.client_generated_uuid}`
                    );
                    return;
                }
                RedisSubscriptionManager.getInstance().deleteChatMessage(
                    message.payload.type,
                    message.payload?.room,
                    //@ts-ignore
                    message.payload?.client_generated_uuid,
                    //@ts-ignore
                    message.payload?._id
                );
                break;

            case MESSAGE_TYPE.SUBSCRIBE:
                if (
                    this.subscriptions.find((x) =>
                        x.room === message.payload.room &&
                        x.type === message.payload.type
                    )
                ) {
                    return;
                }
                await this.validateOwnership(
                    message.payload.room,
                    message.payload.type,
                );
                break;
        }
    };

    async validateOwnership(
        room: string,
        type: SubscriptionType,
    ) {
        let roomValidation = false;
        if (type === "INDIVIDUAL") {
            //@ts-ignore
            roomValidation = await validateRoom(
                this.userId,
                //@ts-ignore
                room,
                this.jwt
            );
            if (!roomValidation) {
                console.log(`User ${this.userId} doesn't have access to room ${room} `);
                return;
            }
        }
        console.log({ roomValidation }, 'roomValidation');
        console.log({ type, room })
        // TODO(Raju) Handle for groupMessage also.
        if (roomValidation) {
            this.subscriptions.push({
                type,
                room,
            });
            console.log(this.subscriptions, 'before...pushed to subscriptions..');
            console.log('Post-Subscribing it...');
            RedisSubscriptionManager.getInstance().postSubscribe(
                this.userId,
                type,
                room,
                roomValidation
            );
        }
    }

    send(message: FromServer) {
        this.ws.send(JSON.stringify(message));
    }

    destroy() {
        RedisSubscriptionManager.getInstance().userLeft(this.userId);
        // id-type-room
        this.subscriptions.forEach((s) =>
            RedisSubscriptionManager.getInstance().postUnsubscribe(
                this.userId,
                s.type,
                s.room
            )
        );
    }
};






