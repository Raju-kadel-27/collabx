import axios from "axios";
import { BACKEND__URL } from "./validateRoom";

export const getMessageFromId = async (
    messageId: string
) => {
    try {
        const response = await axios.get(`${BACKEND__URL}/message/info/${messageId}`);
        const messageToDelete = await response.data;
        console.log({ messageToDelete });
        return messageToDelete;
    } catch (error) {
        console.log({ error });
    }
}