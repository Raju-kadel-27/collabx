import { Inject, Service } from "typedi";
import { ChatRepository } from "../Repository";
import { verifyJWT, verifyRawJWT } from "../../lib/middlewares/verifyJWT";

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
export interface AddToGroup {
  chatId: string;
  userId: string;
}
export interface DeleteGroup {
  chatId: string;
}
export interface ValidateRoom {
  userId: string;
  room: string;
  jwtToken: string;
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
export class ChatService {
  constructor(@Inject() private chatRepository: ChatRepository) { }

  async UpdateLatestMessage(payload: UpdateLatestMessage) {
    return await this.chatRepository.updateLatestMessage(payload);
  }

  async UpdateLatestMessageGroup(payload: UpdateLatestMessageGroup) {
    return await this.chatRepository.updateLatestMessageGroup(payload);
  }

  async FetchAllUsers() {
    return await this.chatRepository.fetchAllUsers();
  }

  async FetchAllChats(payload: FetchAllChats) {
    console.log({ payload });
    return await this.chatRepository.fetchAllChats(payload);
  }

  async AccessChat(payload: AccessChat) {
    return await this.chatRepository.accessChat(payload);
  }

  async ValidateRoom(payload: ValidateRoom) {
    const { userId, jwtToken, room } = payload;
    console.log({ userId, jwtToken, room });
    const canAccess: any = await verifyRawJWT(jwtToken);
    console.log({ canAccess });
    if (canAccess) {
      return await this.chatRepository.validateRoom({ userId, room });
    }
  }

  async CreateGroup(payload: CreateGroup) {
    return await this.chatRepository.createGroup(payload);
  }

  async RenameGroup(payload: RenameGroup) {
    return await this.chatRepository.renameGroup(payload);
  }

  async DeleteGroup(payload: DeleteGroup) {
    return await this.chatRepository.deleteGroup(payload);
  }

  async AddToGroup(payload: AddToGroup) {
    return await this.chatRepository.addToGroup(payload);
  }

  async RemoveFromGroup(payload: RemoveFromGroup) {
    return await this.chatRepository.removeFromGroup(payload);
  }

}
