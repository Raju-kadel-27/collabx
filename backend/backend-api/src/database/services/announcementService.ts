import { Inject, Service } from 'typedi'
import { AnnouncementRepository } from '../Repository/AnnouncementRepository';
import { Logger } from 'winston';

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
export class AnnouncementService {
    
    constructor(
        @Inject() private announcementRepository: AnnouncementRepository,
        @Inject('logger') private logger: Logger
    ) { }

    async GetAnnouncements(payload: GetAnnouncements) {
        const { channelId } = payload;
        const allAnnouncements: any = 
        await this.announcementRepository
        .getAnnouncements({ channelId })

        if (!allAnnouncements.length) {
            this.logger.error('Couldnot get announcements');
            throw new Error('Couldnot get announcements')
        }

        return allAnnouncements;
    }
    

    async CreateAnnouncement(payload: CreateAnnouncement) {
        const {
            title,
            content,
            announcer,
            priority,
            attachments
        } = payload;

        return await this.announcementRepository.createAnnouncement({
            title,
            content,
            announcer,
            priority,
            attachments
        })
    }


    async UpdateAnnouncement(payload: UpdateAnnouncement) {
        const {
            announcementId,
            fieldsToUpdate
        } = payload;

        console.log({announcementId, fieldsToUpdate})

        this.logger.info('Calling announcement info in the factory');
        this.logger.info('calling updateAnnouncement in repository');
        
        return await this.announcementRepository.updateAnnouncement({
            announcementId,
            fieldsToUpdate
        })

    }


    async DeleteAnnouncement(payload: DeleteAnnouncement) {

        const { announcementId } = payload;

        return await this.announcementRepository.deleteAnnouncement({ announcementId });

    }


}