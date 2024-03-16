import axios from "axios";


interface MessageData {
    sender: string;
    content: string;
    chat: string;
    readBy: string[];
  }

export const postChannelMessage = async (message) => {
    try {
        console.log('Message Data has been published here in Nepal.')
        console.log('Message Data has been published here in Nepal.')
    } catch (error) {
        console.log({ error });
    }
}
