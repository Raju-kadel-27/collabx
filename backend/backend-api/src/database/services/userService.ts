import { Inject } from 'typedi'
import { UserRepository } from '../Repository/UserRepository';

interface SearchUserPayload {
    keyword: string;
    userId: string;
}
interface GetAllUsers {
    teamId: string;
    channelId: string;
}

export class UserService {
    constructor(
        @Inject() private userRepository: UserRepository
    ) { }

    async searchAllUsers(payload: SearchUserPayload) {
        return await this.userRepository.searchAllUsers(payload);
    }

}
