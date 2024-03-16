import axios from "axios";
import { BACKEND__URL } from "./validateRoom";

interface MessageData {
    client_generated_uuid: string;
    room: string;
    type: string;
    message: string;
    message_kind: string;
    user1_last_read_message: string;
    user2_last_read_message: string;
    publicKey: string;
    sender: string;
};

export const sendMessage = async ({
    client_generated_uuid,
    room,
    type,
    message,
    message_kind,
    user1_last_read_message,
    user2_last_read_message,
    publicKey,
    sender
}: MessageData) => {
    try {
        console.log(room, type, message, message_kind);
        console.log('Sending__message__kind');
        const response = await axios.post(`${BACKEND__URL}/api/message/sendmessage`, {
            client_generated_uuid,
            room,
            type,
            message,
            message_kind,
            user1_last_read_message,
            user2_last_read_message,
            publicKey,
            sender
        })
        const newMessage = await response.data;
        console.log({ newMessage }, 'from send__message');
        return newMessage?.message?._id;
        console.log('Message has been sent to database for persistence')
    } catch (error) {
        console.log({ error });
    }
}