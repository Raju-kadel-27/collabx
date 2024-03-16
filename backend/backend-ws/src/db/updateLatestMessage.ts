import axios from "axios";
import { BACKEND__URL } from "./validateRoom";

export interface updateLatestMessage {
    room: string;
    messageId: string;
    messageKind: string;
    userId: string,
    roomValidation: {
        user1: string,
        user2: string
    },
    client_generated_uuid: string;
}

export const updateLatestMessage = async (
    room: string,
    messageId: string,
    messageKind: string,
    userId: string,
    roomValidation: {
        user1: string,
        user2: string
    },
    client_generated_uuid: string
) => {
    console.log({
        room,
        messageId,
        messageKind,
        userId,
        roomValidation,
        client_generated_uuid
    })
    console.log({messageId},'Message_id_in_the_room');
    try {
        const response = await axios.post(`${BACKEND__URL}/api/chats/update/latestmessage`, {
            room,
            messageId,
            messageKind,
            userId,
            roomValidation,
            client_generated_uuid
        })
        const hasLatestMessageUpdated = await response.data;
        console.log({ hasLatestMessageUpdated });
        if (hasLatestMessageUpdated) {
            return true;
        }
        return false;

    } catch (error) {
        console.log({ error });
    }
}