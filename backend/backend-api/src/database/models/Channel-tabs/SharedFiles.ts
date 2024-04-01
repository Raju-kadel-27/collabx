import mongoose, { Document } from "mongoose";

export interface ISharedFile extends Document {
    originalPost: string;
    sharedChannels: [string];
};

const SharedPostSchema = new mongoose.Schema(
    {
        originalFile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            // required: true,

        },

        sharedChannels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Channel',
                // required: true
            }
        ]
    },
    { timestamps: true }
);

const SharedFileModel = mongoose.model<ISharedFile>("SharedFile", SharedPostSchema);

export default SharedFileModel;