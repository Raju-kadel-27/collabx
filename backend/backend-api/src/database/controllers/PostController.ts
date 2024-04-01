import Container from "typedi";
import { Request, Response, NextFunction } from 'express'
import { PostService } from "../services/postService";

// Remember:
// For the bulk update like taskplanner is relevant for fewer frequency of updates
// But post reactions and replies may changes at any time by any no. of people
// So better to make separate queries to handle each api call for them.

interface AddReplies {
    postId: string;
    ReplierId: string;
    content: string;
    parentId: string;
    isNestedReply: boolean;
}

export const getAllPosts =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const postService = Container.get(PostService);
            console.log(req.params.userId)
            const newPost = await postService.GetAllPost({ channelId: req.params.channelId })
            res.status(200).json(newPost);
        } catch (error) {
            next(error)
        }
    }


export const createPost =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            const newPost = await postService.CreatePost(req.body)
            res.status(200).json(newPost);
        } catch (error) {
            next(error)
        }
    }


export const updatePost =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            const payload = {
                postId: req.body.postId,
                fieldsToUpdate: req.body
            }
            const { newPost }: any = await postService.UpdatePost(payload)
            res.status(200).json(newPost);
        } catch (error) {
            next(error)
        }
    }

export const deletePost =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            await postService.DeletePost(req.body)
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            next(error)
        }
    }

export const increamentPostReaction =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            const response = await postService.IncreamentReaction(req.body)
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }

export const decreamentPostReaction =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            await postService.DecreamentReaction(req.body)
            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error)
        }
    }

export const addPostReplies =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const postService = Container.get(PostService);
            const newReply = await postService.AddReplies(req.body as AddReplies);
            res.status(200).json(newReply);
        } catch (error) {
            next(error)
        }
    }

export const updatePostReplies =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const postService = Container.get(PostService);
            await postService.UpdateReplies(req.body)
            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error)
        }
    }


export const deletePostReplies =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const postService = Container.get(PostService);
            await postService.DeleteReplies(req.body);
            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error)
        }
    }    