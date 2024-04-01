import mongoose, { Document } from "mongoose";

export interface ISharedPost extends Document {
    originalPost: string;
    sharedChannels: [string];
}

const SharedPostSchema = new mongoose.Schema(
    {

        originalPost: {
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

const SharedPostModel = mongoose.model<ISharedPost>("SharedPost", SharedPostSchema);

export default SharedPostModel;