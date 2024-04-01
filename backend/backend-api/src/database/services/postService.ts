import { Inject, Service } from 'typedi'
import { UserRepository } from '../Repository/UserRepository';
import { PostRepository } from '../Repository/PostRepository';

interface GetAllPost {
    channelId: string;
}

interface UpdatePost {
    postId: string;
    fieldsToUpdate: any
}

interface AddReplies {
    postId: string;
    ReplierId: string;
    content: string;
    parentId: string;
    isNestedReply: boolean;
}

@Service()
export class PostService {
    constructor(
        @Inject() private postRepository: PostRepository,
        @Inject('logger') logger: any
    ) { }

    async GetAllPost(payload: GetAllPost) {
        const { channelId } = payload;
        return await this.postRepository.GetAllPosts({ channelId })
    }

    async CreatePost(payload: any) {
        const newPost: any = await this.postRepository.CreatePost(payload);
        if (!newPost) {
            throw new Error('couldnot create post')
        }
        return newPost;
    }

    async UpdatePost(payload: UpdatePost) {
        const { fieldsToUpdate, postId } = payload;

        return await this.postRepository.UpdateContent({ fieldsToUpdate, postId });
    }

    async DeletePost(payload: any) {
        const { } = payload;

        return await this.postRepository.DeletePost(payload);
    }

    async IncreamentReaction(payload: any) {
        const { postId, reactionType, reactorUserId } = payload;
        return await this.postRepository.IncreamentReaction({
            postId,
            reactionType,
            reactorUserId
        });
    }

    async DecreamentReaction(payload: any) {
        const { } = payload;

        return await this.postRepository.DecreamentReaction(payload);
    }

    async AddReplies(payload: AddReplies) {
        const { 
            postId,
            ReplierId,
            content,
            parentId,
            isNestedReply
        } = payload;
        return await this.postRepository.AddReplies({
            postId,
            ReplierId,
            content,
            parentId,
            isNestedReply
        });
    }

    async UpdateReplies(payload: any) {
        const { } = payload;

        return await this.postRepository.UpdateReplies(payload);
    }

    async DeleteReplies(payload: any) {
        const { } = payload;

        return await this.postRepository.DeleteReplies(payload);
    }

}
