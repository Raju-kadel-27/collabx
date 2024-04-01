import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IAnnouncement } from '../models/Channel-tabs/Announcement';

interface GetAnnouncements {
    channelId: string;
}

interface CreateAnnouncement {
    title: string;
    content: string;
    announcer: string;
    priority: string;
    attachments: {
        url: string;
        fileType: string;
        fileName: string;
    }[]
}

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

interface DeleteAnnouncement {
    announcementId: string;
}

@Service()
export class AnnouncementRepository {

    constructor(
        @Inject('announcementModel') private announcementModel: Model<IAnnouncement>
    ) { }

    async getAnnouncements({ channelId }: GetAnnouncements) {

        return await this.announcementModel
            .find({ channelId })
            .populate('announcer','name email')
            .exec()
    }

    async createAnnouncement(
        {
            title,
            content,
            announcer,
            priority,
            attachments
        }: CreateAnnouncement
    ) {

        console.log({ title, content });

        return await this.announcementModel.create({
            title,
            content,
            announcer,
            priority,
            attachments
        });
    }


    async updateAnnouncement(
        {
            announcementId,
            fieldsToUpdate
        }: UpdateAnnouncement
    ) {

        console.log({ fieldsToUpdate, announcementId });

        return await this.announcementModel.findByIdAndUpdate(
            announcementId,
            fieldsToUpdate,
            { new: true }
        );

    }


    async deleteAnnouncement({ announcementId }: DeleteAnnouncement) {

        return await this.announcementModel.findByIdAndDelete(announcementId);

    }


}