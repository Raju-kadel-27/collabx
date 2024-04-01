import { Inject, Service } from "typedi";
import { IMessage } from "../models/Message";
import { Document, Model } from "mongoose";
import { IUser } from "../models/User";
import { IChat } from "../models/Chat";

interface IMessageInput {
  client_generated_uuid: string;
  chat: string;
  room: string;
  type: string;
  content: string;
  user1_last_read_message: string;
  user2_last_read_message: string;
  publicKey: string;
  sender: string;
}
interface IDeleteMessage {
  client_generated_uuid: string;
  room: string;
  messageId: string;
}

@Service()
export class MessageRepository {
  constructor(
    @Inject("chatModel") private chatModel: Model<any>,
    @Inject("userModel") private userModel: Model<any>,
    @Inject("messageModel") private messageModel: Model<IMessage>
  ) { }

  async fetchMessages(chatId: string) {
    return await this.messageModel
      .find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
  }

  async getMessage(
    messageId: string
  ) {
    return await this.messageModel.findById(messageId);
  }

  async deleteMessage({
    messageId,
    client_generated_uuid,
    room
  }: IDeleteMessage) {
    return await this.messageModel.findByIdAndDelete(messageId)
    // return await this.messageModel.deleteOne({
    //   messageId,
    //   client_generated_uuid,
    //   room
    // })
  }

  async sendMessage(messageData: IMessageInput) {
    console.log({ messageData });
    console.log('Send-message function () is called');
    let message: any = await this.messageModel.create(messageData);
    message = await this.messageModel.populate(
      message,
      {
        path: 'sender',
        select: 'name pic email'
      }
    )

    message = await this.messageModel.populate(
      message,
      {
        path: 'chat',
        select: 'chatName isGroupChat chatRoom users latestMessage groupAdmin'
      }
    );

    message = await this.userModel.populate(
      message,
      {
        path: "chat.users",
        select: "name",
      })

    let finalMessage = await this.chatModel.findByIdAndUpdate(
      messageData.chat,
      {
        latestMessage: message,
      }
    );

    return message;

  }
}


