import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { PollService } from "../services/pollService";
import { Logger } from "winston";
import { tryEach } from "async";
// Interface Design Info()
// Letting you all go ()
// interfacing command info

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
// Votes
// 117
// increased by23.36%
interface NotificationService{
    userName: string;
    email:string;
    phone: number;
    isMale: boolean
}
interface getServerLang {
    pollPeriod:string
}
interface UserManager {
    name: string;
    email: string;
    class: number;
    isMarried: boolean;
}
interface Test extends UserManager{}

interface GetOptionMetadataa {
    pollId: string;
    channelId: string;
}
// interface GetOptionMetadata {
//     channelId: string;
//     optionId: string;
// }
interface GetPosts {
    channelId: string;
    title: string;
    description: string;
    createdBy: string;
    tags: string[];
    comments: Comment[]
}

console.log('#Register#-#webhook#endpoint-tqw')

export const getPollMetadata =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const allPolls = await pollService.GetPollMetadata(req.body)
            res.status(200).json(allPolls);
        } catch (error) {
            next(error)
        }
    };

export const getOptionMetadata =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const logger = Container.get<Logger>('logger');
            try {
                const pollService = Container.get(PollService);
                logger.info('Calling GetOptionMetadata with body', req.body);
                const allPolls = await pollService.GetOptionMetadata(req.body as any)
                res.status(200).json(allPolls);
            } catch (error) {
                logger.error('Error occured: ', error);
                next(error)
            }
        } catch (error) {
            console.log('error occured from logger')
            next(error)
        }
    };

export const getPollsByChannelId =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const allPolls = await pollService.GetPollsByChannel(req.body as GetAllPolls)
            res.status(200).json(allPolls);
        } catch (error) {
            next(error)
        }
    };

export const getPollStats =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const allPolls = await pollService.GetPollStats(req.body as any)
            res.status(200).json(allPolls);
        } catch (error) {
            next(error)
        }
    };

export const castVote =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const logger = Container.get<Logger>('logger');
            try {

                const pollService = Container.get(PollService);
                const newVote = await pollService.CastVote(req.body);
                res.status(200).json(newVote);

            } catch (error) {
                logger.error(error)
                next()
            }
        } catch (error) {
            console.log('Error occured in api__section');
            console.error({error});
            console.log('Couldnot get logger from typedi container');
            next()
        }
    }

export const createPoll =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const logger = Container.get<Logger>('logger');
            try {
                const pollService = Container.get(PollService);
                const newPoll = await pollService.CreatePoll(req.body as CreatePoll)
                res.status(200).json(newPoll);
            } catch (error) {
                logger.error(error);
                next(error)
            }
        } catch (error) {
            console.log('Couldnot get logger from typedi container ')
            next(error)
        }
    };

export const postComment =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const newComment = await pollService.UpdatePoll(req.body as UpdatePoll)
            res.status(200).json(newComment);
        } catch (error) {
            next(error)
        }
    };

export const updateComment =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const updatedComment = await pollService.UpdatePoll(req.body as UpdatePoll)
            res.status(200).json(updatedComment);
        } catch (error) {
            next(error)
        }
    };

export const deleteComment =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const deletedComment = await pollService.UpdatePoll(req.body as UpdatePoll)
            res.status(200).json(deletedComment);
        } catch (error) {
            next(error)
        }
    };

export const updatePoll =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const updatedPoll = await pollService.UpdatePoll(req.body as UpdatePoll)
            res.status(200).json(updatedPoll);
        } catch (error) {
            next(error)
        }
    };

export const deletePoll =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const deletedPoll = await pollService.DeletePoll(req.body as DeletePoll)
            res.status(200).json(deletedPoll);
        } catch (error) {
            next(error)
        }
    };

export const addTag =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const deletedPoll = await pollService.DeletePoll(req.body as DeletePoll)
            res.status(200).json(deletedPoll);
        } catch (error) {
            next(error)
        }
    };

export const removeTag =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const pollService = Container.get(PollService);
            const deletedPoll = await pollService.DeletePoll(req.body as DeletePoll)
            res.status(200).json(deletedPoll);
        } catch (error) {
            next(error)
        }
    };

