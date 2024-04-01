import mongoose, { Document } from 'mongoose';

interface IAttachment {
    url: string;
    fileName: string;
    fileType: string;
}





export interface IAnnouncement extends Document {
    title?: string;
    content?: string;
    announcer?: string;
    priority?: string;
    attachments: IAttachment[];
}

const AnnouncementSchema = new mongoose.Schema({

    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    },

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    announcer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    priority: {
        type: String,
        default: false,
    },

    attachments: [
        {
            url: String,
            fileType: String,
            fileName: String,
        }
    ],

},
    {
        timestamps: true
    });


const AnnouncementModel = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

export default AnnouncementModel;

