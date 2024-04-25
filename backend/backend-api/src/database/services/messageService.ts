import { Inject, Service } from "typedi";
import { MessageRepository } from "../Repository";
import { ResponseMessage, SendMessage } from "../../types/message";
import { FormateMessage } from "../../utils/message";

interface Formatted {
  sender: string;
  chat: string;
  content: string;
}
interface IMessageInput {
  client_generated_uuid: string;
  room: string;
  type: string;
  message: string;
  message_kind: string;
  user1_last_read_message: string;
  user2_last_read_message: string;
  publicKey: string;
  sender: string;
}
interface IDeleteMessage {
  client_generated_uuid: string;
  messageId: string;
  room: string;
}

@Service()
export class MessageService {

  constructor(@Inject() private messageRepository: MessageRepository) { }

  async GetAllMessages(chatId: string) {
    return await this.messageRepository.fetchMessages(chatId);
  };

  async DeleteMessage({
    messageId,
    client_generated_uuid,
    room
  }: IDeleteMessage) {
    return await this.messageRepository.deleteMessage({
      client_generated_uuid,
      messageId,
      room
    })
  }

  async GetMessage(
    messageId: string
  ) {
    return await this.messageRepository.getMessage(messageId);
  }

  async SendMessage(payload: IMessageInput): Promise<ResponseMessage> {
    // version(1) Implementation
    // const { senderId, chatId, content } = payload;
    // const formatted: any = FormateMessage(payload);
    // return await this.messageRepository.sendMessage(formatted);

    // version(2) Implementation
    return await this.messageRepository.sendMessage(payload);
  };

}
