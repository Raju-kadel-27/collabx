import { Inject, Service } from "typedi";
import { TeamRepository } from "../Repository";

interface TeamId {
    teamId: string;
}
interface UserId {
    userId: string;
}
interface GetTeamsByUserId {
    userId: string;
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
interface GetChannels extends TeamId { }
interface GetAllTeamMembers extends TeamId { }
interface RemoveOwners extends AddOwners { }
interface RemoveChannels extends AddChannels { }
interface RemoveMembers extends AddMembers { }
interface DeleteTeam extends TeamId { }
interface CreateTeam extends
    UserId,
    UpdateName,
    AddChannels,
    AddOwners,
    AddMembers { }

@Service()
export class TeamService {

    constructor(@Inject() private teamRepository: TeamRepository) { }

    async GetTeamsByUserId(payload: GetTeamsByUserId) {
        // const { userId } = payload;
        let userId = '658c2f62d2d12f120b0e2f94'
        const teams: any = await this.teamRepository.GetTeams(userId)
        if (teams?.length < 1) {
            return { teams: [] }
        }
        return { teams }
    }

    async GetAllTeamMembers({ teamId }: GetAllTeamMembers) {

        const teams: any = await this.teamRepository.GetAllTeamMembers({teamId});
        if (teams?.length < 1) {
            return { teams: [] }
        }
        return { teams }
    }

    async GetChannels(payload: GetChannels) {
        const result = await this.teamRepository.GetChannels(payload)
        return { updated: result }
    }

    async CreateTeam(payload: CreateTeam) {
        console.log('create team service called()')
        const { team } = await this.teamRepository.CreateTeam(payload)
        return { updated: team }
    }

    async UpdateName(payload: UpdateName) {
        const result = await this.teamRepository.UpdateName(payload)
        return { updated: result }
    }

    async AddMembers(payload: AddMembers) {
        const result = await this.teamRepository.AddMembers(payload)
        return { updated: result }
    }

    async RemoveMembers(payload: RemoveMembers) {
        const result = await this.teamRepository.RemoveMembers(payload)
        return { updated: result }
    }

    async AddOwners(payload: AddOwners) {
        const result = await this.teamRepository.AddOwners(payload)
        return result
    }

    async RemoveOwners(payload: RemoveOwners) {
        const result = await this.teamRepository.RemoveOwners(payload)
        return { updated: result }
    }

    async AddChannels(payload: AddChannels) {
        const result = await this.teamRepository.AddChannels(payload)
        return { updated: result }
    }

    async RemoveChannels(payload: RemoveChannels) {
        const result = await this.teamRepository.RemoveChannels(payload)
        return { updated: result }
    }

    async DeleteTeam(payload: DeleteTeam) {
        await this.teamRepository.DeleteTeam(payload)
        return { message: 'success' }
    }

}

