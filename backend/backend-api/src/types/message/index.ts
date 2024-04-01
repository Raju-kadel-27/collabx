export interface IMessageInput {
  senderId: string;
  chatId: string;
  content: string;
}
export interface SendMessage {
  senderId: string;
  chatId: string;
  content: string;
}

export interface ResponseMessage {
  sender: string;
  chat: string;
  content: string;
}
