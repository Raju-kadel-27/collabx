import { uuid } from "uuidv4";
import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IChat } from "../models/Chat";
import { IUser } from "../models/User";

export interface FetchAllChats {
  userId: string;
}
export interface AccessChat {
  ownId: string;
  peerId: string;
}
export interface CreateGroup {
  chatName: string;
  isGroupChat: boolean;
  groupAdmin: string;
  users: string[]
}
export interface RenameGroup {
  chatId: string;
  chatName: string;
}
export interface RemoveFromGroup {
  chatId: string;
  userId: string;
}
export interface DeleteGroup {
  chatId: string;
}
export interface AddToGroup {
  chatId: string;
  userId: string;
}
export interface ValidateRoom {
  userId: string;
  room: string;
}
export interface UpdateLatestMessage {
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

export interface UpdateLatestMessageGroup {
  room: string;
  messageId: string;
  messageKind: string;
  userId: string,
  client_generated_uuid: string;
}

@Service()
export class ChatRepository {
  constructor(
    @Inject("chatModel") private chatModel: Model<IChat>,
    @Inject("userModel") private userModel: Model<IUser>
  ) { }

  async updateLatestMessage({
    room,
    messageId
  }: UpdateLatestMessage) {
    console.log({ room, messageId });
    return await this.chatModel.findByIdAndUpdate(room, {
      $set: { latestMessage: messageId }
    })
  }

  async updateLatestMessageGroup({
    room,
    messageId
  }: UpdateLatestMessageGroup) {
    console.log({ room, messageId });
    return await this.chatModel.findByIdAndUpdate(room, {
      $set: { latestMessage: messageId }
    })
  }

  async fetchAllUsers() {
    return await this.userModel.find()
  }

  async fetchAllChats(payload: FetchAllChats) {
    const { userId } = payload;
    return await this.chatModel
      .find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
  }

  async validateRoom({ userId, room }: ValidateRoom) {
    return await this.chatModel.findById(room);
    
    // return await this.chatModel
    //   .find({
    //     // users: { $elemMatch: { $eq: userId } },
    //     chatRoom: room
    //   })
    //   .select("users")
    //   .exec()
  }

  async accessChat(payload: AccessChat) {
    const { ownId, peerId } = payload;

    let isChat: any = await this.chatModel
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: ownId } } },
          { users: { $elemMatch: { $eq: peerId } } },
        ],
      })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await this.userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email password",
    });

    if (isChat.length > 0) {
      return isChat;
    } else {
      const randomChatId = uuid();

      const newChatData = {
        isGroupChat: false,
        chatName: "sender",
        users: [ownId, peerId],
        chatRoom: randomChatId,
      };

      const newCreatedChat = await this.chatModel.create(newChatData);

      return await this.chatModel
        .findOne({ _id: newCreatedChat._id })
        .populate("users", "-password");
    }
  }

  async createGroup(payload: CreateGroup) {
    const { chatName, isGroupChat, groupAdmin, users } = payload;

    const group_Chat = await this.chatModel.create({
      chatName,
      isGroupChat,
      groupAdmin,
      users,
    });

    return await this.chatModel
      .findOne({ _id: group_Chat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  }

  async renameGroup(payload: RenameGroup) {
    const { chatId, chatName } = payload;
    return await this.chatModel
      .findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  }

  async addToGroup(payload: AddToGroup) {
    const { chatId, userId } = payload;

    return await this.chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  }

  async removeFromGroup(payload: RemoveFromGroup) {
    const { chatId, userId } = payload;
    return await this.chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  }

  async deleteGroup(payload: DeleteGroup) {
    const { chatId } = payload
    return await this.chatModel.findByIdAndDelete(chatId);
  }

}
