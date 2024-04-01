import { Inject, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { IPost } from "../models/Channel-tabs/Post";
import { IReplies } from "../models/Channel-tabs/Replies";
import { IChannel } from "../models/Channel";
import { ISharedPost } from "../models/Channel-tabs/SharedPosts";

interface GetAllPost {
    channelId: string;
}
interface UpdateContent {
    postId: string;
    fieldsToUpdate: string;
}
interface DeletePost {
    postId: string;
    sharedChannelIds: string[];
}
interface IncreamentReaction {
    postId: string;
    reactionType: string;
    reactorUserId: string;
}
interface AddReplies {
    postId: string;
    ReplierId: string;
    content: string;
    parentId: string;
    isNestedReply: boolean;
}
interface UpdateReplies {
    isNestedReply: boolean;
    ReplierId: string;
    parentId: string;
    content: string;
}
interface DeleteReplies {
    replyId: string;
    parentId: string;
    isNestedReply: boolean;
}
interface CreatePost {
    teamId: string;
    channelId: string;
    authorId: string;
    content: string;
    reactions: string;
    reactionsCount: number;
    attachments: number;
    sharedChannels: string[]
}

interface DecreamentReaction extends IncreamentReaction { }

@Service()
export class PostRepository {

    constructor(
        @Inject('postModel') private postModel: Model<IPost>,
        @Inject('repliesModel') private repliesModel: Model<IReplies>,
        @Inject('channelModel') private channelModel: Model<IChannel>,
        @Inject('sharedPostModel') private sharedPostModel: Model<ISharedPost>,
    ) { }

    async GetAllPosts({ channelId }: GetAllPost) {

        console.log('Getall posts are called', { channelId });

        return await this.postModel
            .find({ channelId })
            .populate('authorId', 'name email pic');
    }

    // async CreatePost({
    //     teamId,
    //     channelId,
    //     authorId,
    //     content,
    //     reactions,
    //     reactionsCount,
    //     attachments,
    //     sharedChannels,
    // }: CreatePost) {

    //     console.log({
    //         teamId, channelId, authorId,
    //         content, reactions
    //     })

    //     const session = await mongoose.startSession();
    //     let post: any = null
    //     try {
    //         await session.withTransaction(async () => {
    //             post = await this.postModel.create(
    //                 {
    //                     teamId,
    //                     channelId,
    //                     authorId,
    //                     content,
    //                     reactions,
    //                     reactionsCount,
    //                     attachments,
    //                     sharedChannels,
    //                 },
    //                 { session }
    //             );

    //             if (sharedChannels) {
    //                 const sharedPost: any = await this.sharedPostModel.create(
    //                     {
    //                         originalPost: post._id,
    //                         sharedChannels: sharedChannels,
    //                     },
    //                     { session }
    //                 );

    //                 await this.channelModel.updateMany(
    //                     { _id: { $in: sharedChannels } },
    //                     {
    //                         $push: { sharedPosts: sharedPost._id },
    //                     },
    //                     { session }
    //                 );
    //             }
    //         });

    //         await session.commitTransaction();
    //         console.log({ post }, 'post from transaction')
    //         return post;
    //     } catch (error) {
    //         console.log({ error });
    //         await session.abortTransaction();
    //         return { message: 'Internal server error', status: 500 };
    //     } finally {
    //         session.endSession();
    //     }
    // }

    async CreatePost(
        {
            teamId,
            channelId,
            authorId,
            content,
            reactions,
            reactionsCount,
            attachments,
            sharedChannels
        }: CreatePost
    ) {

        const session = await mongoose.startSession()

        session.startTransaction()

        try {
            let post: any = await this.postModel.create({
                teamId,
                channelId,
                authorId,
                content,
                reactions,
                reactionsCount,
                attachments,
                sharedChannels
            })

            if (sharedChannels) {
                const sharedPost = await this.sharedPostModel.create({
                    originalPost: post._id,
                    sharedChannels: sharedChannels
                })

                await this.channelModel.updateMany(
                    { _id: { $in: sharedChannels } },
                    {
                        $push: { sharedPosts: sharedPost._id }
                    }
                )
            }

            const populatedPost = await this.postModel
                .findById(post._id)
                .populate('authorId', 'name pic email') // Assuming 'username' is a field in the User model
                .exec();

            await session.commitTransaction();

            return populatedPost;
        }
        catch (error) {
            console.log({ error })
            await session.abortTransaction();
            return { message: "Internal server error", status: 500, }
        }
        finally {

            await session.endSession();
        }
    };

    async UpdateDynamicContent() {
        try {
            console.log("Dynamic content is being saturated here.")
        } catch (error) {
            console.log({ error })
        }
    }

    async UpdateContent({ fieldsToUpdate, postId }: UpdateContent) {

        return await this.postModel.findByIdAndUpdate(
            postId,
            {
                $set: { content: fieldsToUpdate }
            }
        )
    }


    async DeletePost({ postId, sharedChannelIds }: DeletePost) {

        const session = await mongoose.startSession()
        session.startTransaction()

        try {

            if (sharedChannelIds) {

                const sharedPost: any = await this.sharedPostModel.findOne({ originalPost: postId })

                await Promise.all([

                    await this.channelModel.updateMany(
                        { _id: { $in: sharedChannelIds } },
                        {
                            $pull: { sharedPosts: { $in: sharedPost._id } }
                        }
                    ),

                    await this.sharedPostModel.findByIdAndDelete(sharedPost._id)

                ])
            }

            await this.postModel.findByIdAndDelete(postId);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();

        }
        finally {
            await session.endSession();
        }
    };

    async IncreamentReaction({ postId, reactionType, reactorUserId }: IncreamentReaction) {

        console.log({ postId, reactionType, reactorUserId });
       
        return await this.postModel.findByIdAndUpdate(
            postId,
            {
                $inc: { [`reactionsCount.${reactionType}`]: 1 },

                $push: { reactions: { userId: reactorUserId, reactionType } }
            },
            { new: true }
        )
    };

    async DecreamentReaction({ postId, reactionType, reactorUserId }: DecreamentReaction) {

        return await this.postModel.findByIdAndUpdate(
            postId,
            {
                $inc: { [`reactionCount.${reactionType}`]: -1 },

                $pull: { reactions: { userId: reactorUserId, reactionType } }
            },
        )
    };

    async AddReplies(
        {
            postId,
            ReplierId,
            content,
            parentId,
            isNestedReply
        }: AddReplies
    ) {

        if (isNestedReply) {
            const reply = await this.repliesModel.create({
                userId: ReplierId,
                content,
            })
            await this.repliesModel.findByIdAndUpdate(
                parentId,
                {
                    $push: { replies: reply._id }
                }
            )
        } else {
            return await this.repliesModel.create({
                userId: ReplierId,
                content,
                postId,
                parentId,
                isNestedReply
            })
        }
    }

    async UpdateReplies(
        {
            isNestedReply,
            ReplierId,
            parentId,
            content
        }: UpdateReplies
    ) {

        if (isNestedReply) {
            const reply = await this.repliesModel.create({
                userId: ReplierId,
                content,
            })

            await this.repliesModel.findByIdAndUpdate(
                parentId,
                {
                    $push: { replies: reply._id }
                }

            )

        } else {
            return await this.repliesModel.create({
                userId: ReplierId,
                content,
            })

        }
    };


    async DeleteReplies(
        {
            replyId,
            parentId,
            isNestedReply
        }: DeleteReplies
    ) {
        if (isNestedReply) {
            await Promise.all([

                await this.repliesModel.findByIdAndDelete(replyId),

                await this.repliesModel.findOne(
                    { parentId },
                    {
                        $pull: { replies: replyId }
                    }
                )
            ]);

        } else {
            await this.repliesModel.findByIdAndDelete(replyId)
        }
    };

}