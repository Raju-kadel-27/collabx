import { Inject, Service } from "typedi";
import { ChannelRepository } from "../Repository";

interface CreateChannel {
  name: string;
  channelMode: 'Public' | 'Private' | 'Shared';
  teamId: string;
  admins: string[];
  members: string[];
  managers: string[];
  systemPreference: boolean;
  theme: string;
}
interface ChannelId {
  channelId: string;
}
export interface GetAllMembers extends ChannelId {
  teamId: string;
}
interface UpdateName extends ChannelId {
  name: string
}
interface AddMembers extends ChannelId {
  members: string[]
}
interface AddAdmins extends ChannelId {
  admins: string[]
}
interface AddTabs extends ChannelId {
  tabs: string[]
}
interface RemoveAdmins extends AddAdmins { }
interface RemoveMembers extends AddMembers { }
interface RemoveTabs extends AddTabs { }
interface DeleteChannel extends ChannelId { }
interface Channel {
  _id: string;
  name: string;
  teamId: string;
  admins: string[];
  members: string;
  tabs: string[];
}

@Service()
export class ChannelService {
  constructor(@Inject() private channelRepository: ChannelRepository) { }

  async GetAllMembers({teamId,channelId}: GetAllMembers) {
    const members = await this.channelRepository.GetAllMembers({teamId,channelId})
    return { members }
  }
  async CreateChannel(payload: CreateChannel) {
    const result = await this.channelRepository.CreateChannel(payload)
    return { created: result }
  }
  async UpdateName(payload: UpdateName) {
    const { channelId, name } = payload;
    const result = await this.channelRepository.UpdateName({ channelId, name })
    return { updated: result }
  }
  async AddMember(payload: AddMembers) {
    const result = await this.channelRepository.AddMembers(payload)
    return { updated: result }

  }
  async RemoveMember(payload: RemoveMembers) {
    const result = await this.channelRepository.RemoveMembers(payload)
    return { updated: result }

  }
  async AddAdmin(payload: AddAdmins) {
    const result = await this.channelRepository.AddAdmins(payload)
    return { updated: result }

  }
  async RemoveAdmin(payload: RemoveAdmins) {
    const result = await this.channelRepository.RemoveAdmins(payload)
    return { updated: result }

  }
  async AddTab(payload: AddTabs) {
    const result = await this.channelRepository.AddTabs(payload)
    return { updated: result }

  }
  async RemoveTab(payload: RemoveTabs) {
    const result = await this.channelRepository.RemoveTabs(payload)
    return { updated: result }

  }
  async DeleteChannel(payload: DeleteChannel) {
    await this.channelRepository.DeleteChannel(payload)
    return { message: 'success' }
  }

}
