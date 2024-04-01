import mongoose, { Document } from "mongoose";

export interface INotification extends Document {
    user: string;
    type: string;
    content: string;
    link: string;
    read: boolean;
    priority: string;
    sender: { name: string; avatar: string };
    attachments: { url: string; description: string; }[]
}


const senderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String }, // URL to sender's avatar
});


const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        type: {
            type: String,
            enum: ['message', 'like', 'comment', 'follow', 'announcement'],
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        link: {
            type: String,
        },

        read: {
            type: Boolean,
            default: false,
        },

        priority: {
            type: Number,
            default: 0,
        },

        sender: senderSchema,

        attachments: [
            {
                url: { type: String, required: true },
                description: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>('Notification', notificationSchema);

export default NotificationModel;
