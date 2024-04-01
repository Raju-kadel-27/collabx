import { Inject, Service } from 'typedi'
import { PollRepository } from '../Repository';
import { Logger } from 'winston';

interface GetAllPolls {
    channelId: string;
}
interface CreatePoll {
    channelId: string;
    title: string;
    description: string;
    createdBy: string;
    tags: string[];
    comments: Comment[]
}
interface UpdatePoll {
    pollId: string;
    fieldsToUpdate: {
        title?: string;
        description?: string;
        createdBy?: string;
        tags?: string[];
        comments?: Comment[]
    }
}
interface DeletePoll {
    pollId: string;
}
interface CastVote {
    userId: string;
    pollId: string;
    optionId: string;
    votedAt: Date;

}
interface PostComment {
    pollId: string;
    content: string;
    commentedBy: string;
    createdAt: string;
}
interface UpdateComment {
    pollId: string;
    fieldsToUpdate: {
        content: string;
    }
}
interface DeleteComment {
    pollId: string;
    commentId: string;
}
interface RemoveTag {
    pollId: string;
    tagName: string;
}
interface GetPollMetadata {
    workerId: string;
    channelId: string;
    pollId: string;
    conceptEmitter: string;

}
// interface GetOptionMetadata {
//     pollId: string;
//     channelId: string;
// }
interface GetOptionMetadata {
    channelId: string;
    optionId: string;
}

@Service()
export class PollService {
    constructor(
        @Inject() private pollRepository: PollRepository,
        @Inject('logger') private logger: Logger
    ) { }

    async GetPollsByChannel(payload: GetAllPolls) {
        const { channelId } = payload;
        this.logger.info('Getting all the polls for channelId', channelId)
        return await this.pollRepository.GetPollStats({ channelId });
    }

    async GetOptionMetadata(payload: GetPollMetadata) {
        this.logger.info('Getting Poll Metadata');
        return await this.pollRepository.GetPollsMetadata(payload);
    }

    async GetPollStats(payload: GetPollMetadata) {
        this.logger.info('Getting Poll Metadata');
        return await this.pollRepository.GetPollsMetadata(payload);
    }

    async GetPollMetadata(payload: GetPollMetadata) {
        this.logger.info('Getting Poll Metadata');
        return await this.pollRepository.GetPollsMetadata(payload);
    }

    async GetPollStatsByChannel(payload: GetOptionMetadata) {
        this.logger.info('Getting option metadata');
        return await this.pollRepository.GetPollStats(payload);
    }

    async CreatePoll(payload: CreatePoll) {
        this.logger.info('Creating poll with payload', payload);
        return await this.pollRepository.CreatePoll(payload);
    }

    async UpdatePoll(payload: UpdatePoll) {
        return await this.pollRepository.UpdatePoll(payload);
    }

    async DeletePoll(payload: DeletePoll) {
        return await this.pollRepository.DeletePoll(payload);
    }

    async CastVote(payload: CastVote) {
        return await this.pollRepository.CastVote(payload);
    }

    async PostComment(payload: PostComment) {
        return await this.pollRepository.PostComment(payload);
    }

    async UpdateComment(payload: UpdateComment) {
        return await this.pollRepository.UpdateComment(payload);
    }

    async DeleteComment(payload: DeleteComment) {
        return await this.pollRepository.DeleteComment(payload);
    }

    async RemoveTags(payload: RemoveTag) {
        return await this.pollRepository.removeTag(payload);
    }
}