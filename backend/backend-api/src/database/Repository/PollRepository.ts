import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IPoll } from "../models/polling/Poll";
import { Logger } from "winston";
import { IVote } from "../models/polling/Vote";
import { IOption } from "../models/polling/Option";
import { Comment } from "../models/polling/Poll";
import mongoose from "mongoose";

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
interface AddTag {
    pollId: string;
    tagName: string;
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
interface GetOptionMetadataa {
    pollId: string;
    channelId: string;
}
interface GetOptionMetadata {
    channelId: string;
    optionId: string;
}

@Service()
export class PollRepository {

    constructor(
        @Inject('pollModel') private pollModel: Model<IPoll>,
        @Inject('voteModel') private voteModel: Model<IVote>,
        @Inject('optionModel') private optionModel: Model<IOption>,
        @Inject('logger') private logger: Logger
    ) { }

    async GetPollStats({ channelId }: { channelId: string }) {
        return await this.pollModel
            .find({ channelId })
            .populate('createdBy')
            .populate('options')

    }

    async GetOptionMetadata({ optionId }: GetOptionMetadata) {

        return await this.optionModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(optionId) // Match the specified optionId
                }
            },
            {
                $lookup: {
                    from: 'votes', // The name of the Votes collection
                    localField: 'votes',
                    foreignField: '_id',
                    as: 'votes'
                }
            },
            {
                $unwind: {
                    path: '$votes',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'votes.userId',
                    foreignField: '_id',
                    as: 'votes.user'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    pollId: { $first: '$pollId' },
                    optionText: { $first: '$optionText' },
                    votes: { $push: '$votes' }
                }
            }
        ])
    }

    async GetPollsMetadata({ pollId }: GetPollMetadata) {

        return await this.pollModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(pollId)
                }
            },
            {
                $lookup: {
                    from: 'options',
                    localField: 'options',
                    foreignField: '_id',
                    as: 'options'
                }
            },
            {
                $unwind: '$options'
            },
            {
                $lookup: {
                    from: 'votes',
                    localField: 'options.votes',
                    foreignField: '_id',
                    as: 'options.votes'
                }
            },
            {
                $unwind: {
                    path: '$options.votes',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'options.votes.userId',
                    foreignField: '_id',
                    as: 'options.votes.user'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    channelId: { $first: '$channelId' },
                    title: { $first: '$title' },
                    description: { $first: '$description' },
                    createdBy: { $first: '$createdBy' },
                    createdAt: { $first: '$createdAt' },
                    tags: { $first: '$tags' },
                    options: { $push: '$options' },
                    comments: { $first: '$comments' }
                }
            }
        ])
    }

    async CreatePoll({
        channelId,
        title,
        description,
        createdBy,
        tags,
        comments
    }: any) {

        return await this.pollModel
            .create({
                channelId,
                title,
                description,
                createdBy,
                tags,
                comments
            })
    }

    async UpdatePoll({ pollId }: any) {
        return await this.pollModel
            .findByIdAndUpdate(pollId,)
            .populate('authorId', 'name email pic');
    }

    async PostComment({ pollId, content, commentedBy, createdAt }: PostComment) {
        return await this.pollModel
            .findByIdAndUpdate(pollId, {
                $push: { comments: { content, commentedBy, createdAt } }
            }, { new: true })
    }

    async UpdateComment({ pollId, fieldsToUpdate }: UpdateComment) {
        return await this.pollModel
            .findByIdAndUpdate(pollId,
                {
                    $set: fieldsToUpdate
                })
            .populate('authorId', 'name email pic');
    }

    async DeleteComment({ pollId, commentId }: DeleteComment) {
        return await this.pollModel.findByIdAndDelete(pollId, {
            $pull: { comments: { _id: commentId } }
        });
    }

    async CastVote({ pollId, userId, votedAt, optionId }: CastVote) {

        const newVote = await this.voteModel.create({
            userId,
            pollId,
            optionId,
            votedAt
        })

        return await this.optionModel
            .findByIdAndUpdate(optionId, {
                $push: { votes: newVote._id }
            })
    }

    async DeletePoll({ pollId }: DeletePoll) {
        return await this.pollModel.findByIdAndDelete(pollId);
    }

    async addTag({ pollId, tagName }: AddTag) {
        return await this.pollModel.findByIdAndUpdate(pollId, {
            $push: { tags: tagName }
        })
    }

    async removeTag({ pollId, tagName }: RemoveTag) {
        return await this.pollModel.findByIdAndUpdate(
            pollId,
            {
                $pull: { tags: tagName }
            }
        )
    }

}
