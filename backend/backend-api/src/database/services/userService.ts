import { Inject } from 'typedi'
import { UserRepository } from '../Repository/UserRepository';

interface SearchUserPayload {
    keyword: string;
    userId: string;
}

export class UserService {
    constructor(
        @Inject() private userRepository: UserRepository
    ) { }

    async searchAllUsers(payload: SearchUserPayload) {
        return await this.userRepository.searchAllUsers(payload);
    }

}
