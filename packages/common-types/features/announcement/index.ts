export interface GetAnnouncements {
    channelId: string;
}

export interface CreateAnnouncement {
    title: string;
    content: string;
    author: string;
    isUrgent: boolean;
    attachments: {
        url: string;
        fileType: string;
        fileName: string;
    }[]
}

export interface UpdateAnnouncement {
    announcementId: string;
    fieldsToUpdate: {
        title?: string;
        content?: string;
        author?: string;
        isUrgent?: boolean;
        attachments?: {
            url: string;
            fileType: string;
            fileName: string;
        }[]
    }
}

export interface DeleteAnnouncement {
    announcementId: string;
}