import axios from "axios";
import { BACKEND__URL } from "./validateRoom";

export const updateLatestMessageGroup = async (
    room: string,
    messageId: string,
    messageKind: string,
    userId: string,
    client_generated_uuid: string
) => {
    try {
        const response = await axios.post(`${BACKEND__URL}/api/chats/update/lastmessagegroup`, {
            room,
            messageId,
            messageKind,
            userId,
            client_generated_uuid
        })
        const hasLatestMessageUpdated = await response.data;
        console.log({hasLatestMessageUpdated});
        if(hasLatestMessageUpdated){
            return true;
        }
        return false;
    } catch (error) {
        console.log({ error });
    }
}
