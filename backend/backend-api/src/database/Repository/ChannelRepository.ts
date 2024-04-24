import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IChannel } from "../models/Channel";
import { ITeam } from "../models/Team";
import { GetAllMembers } from "../services/channelService";

interface ChannelId {
    channelId: string;
}
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

@Service()
export class ChannelRepository {

    constructor(
        @Inject('channelModel') private channelModel: Model<IChannel>,
        @Inject('teamModel') private teamModel: Model<ITeam>
    ) { }

    async GetAllMembers({channelId,teamId}: GetAllMembers) {
        return await this.channelModel.find({
            $and:[{channelId},{teamId}]
        }).populate("users")
    }

    async CreateChannel(payload: CreateChannel) {
        const { name, channelMode, teamId, admins, members, systemPreference, managers, theme } = payload;
        const channel = await this.channelModel.create({
            name,
            channelMode,
            teamId,
            admins,
            members,
            systemPreference,
            managers,
            theme
        })
        await this.teamModel.findByIdAndUpdate(
            teamId,
            { $push: { channels: channel._id } }
        )
        return channel;
    }
  
    async UpdateName(payload: UpdateName) {
        const { channelId, name } = payload;
        return await this.channelModel.findByIdAndUpdate(
            channelId,
            { $set: { name } },
            { new: true })
    }

    async AddMembers(payload: AddMembers) {
        const { channelId, members: membersToAdd } = payload;
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $push: { members: { $each: membersToAdd } } },
            { new: true })
    }

    async RemoveMembers(payload: RemoveMembers) {
        const { channelId, members: membersToRemove } = payload;
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $pull: { members: { $in: membersToRemove } } },
            { new: true })
    }

    async AddAdmins(payload: AddAdmins) {
        const { channelId, admins: adminsToAdd } = payload;
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $push: { admins: { $each: adminsToAdd } } },
            { new: true })
    }

    async RemoveAdmins(payload: RemoveAdmins) {
        const { channelId, admins: adminsToRemove } = payload;
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $pull: { admins: { $in: adminsToRemove } } },
            { new: true })
    }

    async AddTabs(payload: AddTabs) {
        const { channelId, tabs: tabsToAdd } = payload;
        console.log({ payload });
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $push: { tabsName: { $each: tabsToAdd } } },
            { new: true })
    }

    async RemoveTabs(payload: RemoveTabs) {
        const { channelId, tabs: tabsToRemove } = payload;
        console.log({ payload });
        return await this.channelModel.findByIdAndUpdate(channelId,
            { $pull: { tabsName: { $in: tabsToRemove } } },
            { new: true })
    }

    async DeleteChannel(payload: DeleteChannel) {
        const { channelId } = payload;
        return await this.channelModel.findByIdAndDelete(channelId)
    }

}