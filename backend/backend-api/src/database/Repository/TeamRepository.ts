import { Inject, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { IChannel } from "../models/Channel";
import { ITeam } from "../models/Team";
import { IUser } from "../models/User";
import { Logger } from "winston";

interface UserId {
    userId: string;
}
interface TeamId {
    teamId: string;
}
interface UpdateName extends TeamId {
    name: string;
}
interface AddChannels extends TeamId {
    channels: string[]
}
interface AddOwners extends TeamId {
    owners: string[]
}
interface AddMembers extends TeamId {
    members: string[]
}
interface GetChannels extends TeamId { };
interface GetAllTeamMembers extends TeamId { };
interface RemoveOwners extends AddOwners { };
interface RemoveChannels extends AddChannels { };
interface RemoveMembers extends AddMembers { };
interface DeleteChannel extends TeamId { };
interface CreateTeam extends
    UserId,
    UpdateName,
    AddChannels,
    AddOwners,
    AddMembers { }

@Service()
export class TeamRepository {
    constructor(
        @Inject('channelModel') private channelModel: Model<IChannel>,
        @Inject('userModel') private userModel: Model<IUser>,
        @Inject('teamModel') private teamModel: Model<ITeam>,
        @Inject('logger') private logger: Logger
    ) { }

    async GetTeams(userId: string) {
        this.logger.info(`userId is ${userId}`);
        // const teams = await this.userModel.findById(userId)
        //     .populate('teams')
        //     .exec()
        // const teamWithChannels = await this.channelModel.populate(teams, {
        //     path: 'teams',
        //     populate: {
        //         path: 'channels',
        //         select: 'name members admins'
        //       },
        // })
        // this.logger.error(teamWithChannels);
        // this.logger.error('debugging teamWithChannels,,,')
        // // this.logger.info(teams)
        // return teamWithChannels;

        const userWithTeamsAndChannels = await this.userModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'teams',
                    foreignField: '_id',
                    as: 'teams',
                },
            },
            {
                $unwind: '$teams',
            },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'teams.channels',
                    foreignField: '_id',
                    as: 'teams.channels',
                },
            },
            {
                $group: {
                    _id: '$_id',
                    teams: { $push: '$teams' },
                    // Include other fields as needed
                },
            },
        ]);

        return userWithTeamsAndChannels;
    }

    async GetAllTeamMembers({ teamId }: GetAllTeamMembers) {
        return await this.teamModel
            .findById(teamId)
            .select('members')
            .populate('members')
            .exec()
    }

    async GetChannels(payload: GetChannels) {
        const { teamId } = payload;
        const channels = await this.channelModel
            .find({ teamId })
            .populate('admins')
            .populate('members')
            .populate('teams')

        return channels;
    }

    async CreateTeam(payload: CreateTeam) {

        const { name, members, owners, channels, userId } = payload;

        const team = await this.teamModel.create({
            name,
            members,
            owners,
            channels
        })
        this.logger.info('Created team', team)
        this.logger.info('adding teamId in teams field of user')
        await this.userModel.findByIdAndUpdate(userId,
            { $push: { teams: team._id } },
            { new: true }
        )
        this.logger.info('successfully added in team fields.')
        return { team }
    }


    async UpdateName(payload: UpdateName) {
        try {
            const { teamId, name } = payload;
            this.logger.info(`Calling findByIdAndUpdate with payload: ${teamId} && ${name}`,)

            const result = await this.teamModel.findByIdAndUpdate(
                teamId,
                { $set: { name: name } },
                { new: true })

            this.logger.info(`Result after updating team ${result}`);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async AddMembers(payload: AddMembers) {
        const { teamId, members: membersArray } = payload;

        return await this.teamModel.findByIdAndUpdate(
            teamId,
            { $push: { members: { $each: membersArray } } },
            { new: true })
    }

    async RemoveMembers(payload: RemoveMembers) {
        const { teamId, members: membersArray } = payload;

        return await this.teamModel.findByIdAndUpdate(teamId,
            { $pull: { members: { $in: membersArray } } },
            { new: true })
    }

    async AddOwners(payload: AddOwners) {

        // INFO: In order to be the owner of the team, you have to be the member first.
        // On frontend to select owners, display team members list that solves the issuse.

        const { teamId, owners: ownersArray } = payload;

        return await this.teamModel.findByIdAndUpdate(teamId,
            { $push: { members: { $each: ownersArray } } },
            { new: true })
    }

    async RemoveOwners(payload: RemoveOwners) {
        const { teamId, owners: ownersArray } = payload;

        return await this.teamModel.findByIdAndUpdate(teamId,
            { $pull: { members: { $in: ownersArray } } },
            { new: true })
    }

    async AddChannels(payload: AddChannels) {
        const { teamId, channels: channelsArray } = payload;

        return await this.teamModel.findByIdAndUpdate(teamId,
            { $push: { members: { $each: channelsArray } } },
            { new: true })
    }

    async RemoveChannels(payload: RemoveChannels) {
        const { teamId, channels: channelsArray } = payload;

        return await this.teamModel.findByIdAndUpdate(teamId,
            { $pull: { members: { $in: channelsArray } } },
            { new: true })
    }

    async DeleteTeam(payload: DeleteChannel) {
        const { teamId } = payload;
        return await this.teamModel.findByIdAndDelete(teamId)
    }

}


