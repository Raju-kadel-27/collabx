import { SendMessage } from "../../types/message";

export const FormateMessage = (message: SendMessage) => {
  const { senderId, chatId, content } = message;
  return {
    sender: senderId,
    chat: chatId,
    content,
  };
};
