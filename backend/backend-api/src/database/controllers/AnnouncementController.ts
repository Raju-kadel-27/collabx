import Container from "typedi";
import { Request, Response, NextFunction } from 'express'
import { AnnouncementService } from "../services";

interface UpdateAnnouncement {
    announcementId: string;
    fieldsToUpdate: {
        title?: string;
        content?: string;
        announcer?: string;
        priority?: string;
        attachments?: {
            url: string;
            fileType: string;
            fileName: string;
        }[]
    }
}

export const getAllAnnouncements =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const announcementService = Container.get(AnnouncementService);

            const channelId = req.params.channelId;

            const allTasks = await announcementService.GetAnnouncements({ channelId });

            res.status(200).json(allTasks);

        } catch (error) {

            console.log({ error })
        }
    }


export const createAnnouncements =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {
            console.log('called')
            const announcementService = Container.get(AnnouncementService);

            const newAnnouncement = await announcementService.CreateAnnouncement(req.body);

            res.status(200).json(newAnnouncement);

        } catch (error) {
            next(error)
        }
    }

export const updateAnnouncements =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const announcementService = Container.get(AnnouncementService);
            const payload: UpdateAnnouncement = {
                announcementId: req.body.announcementId,
                fieldsToUpdate: req.body.fieldsToUpdate
            }
            const updatedAnnouncement = await announcementService.UpdateAnnouncement(payload);

            res.status(200).json(updatedAnnouncement);

        } catch (error) {
            next(error)
        }
    }

export const deleteAnnouncements =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const announcementService = Container.get(AnnouncementService);

            const announcementId = req.params.announcementId

            const newAnnouncement = await announcementService.DeleteAnnouncement({ announcementId });

            res.status(200).json(newAnnouncement);

        } catch (error) {
            next(error)
        }
    }

