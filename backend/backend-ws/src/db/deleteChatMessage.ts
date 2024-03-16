import axios from "axios";
import { BACKEND__URL } from "./validateRoom";


export const deleteChatMessage = async (
    room: string,
    client_generated_uuid: string,
    messageId: string,
) => {
    try {
        const response = await axios.post(`${BACKEND__URL}/api/message/delete`, {
            messageId, room, client_generated_uuid
        });
        const message = await response.data;
        console.log({ message });
    } catch (error) {
        console.log({ error });
    }
}