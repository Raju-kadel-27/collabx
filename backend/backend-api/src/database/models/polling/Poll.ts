import { NextFunction } from "express";
import mongoose from "mongoose";
import { IVote } from "./Vote";

export interface Comment {
    content: string;
    name: string;
    pic: string;
    createdAt: string;
}

export interface IPoll extends Document {
    channelId: string;
    title: string;
    description: string;
    createdBy: string;
    tags: string[];
    comments: Comment[];
    votes: IVote[]
};

const PollSchema = new mongoose.Schema({
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String }],
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
    comments: [{
        content: { type: String, required: true },
        name: { type: String, required: true },
        pic: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }]
});

// PollSchema.pre<any>('remove', async function (next: NextFunction) {
//     const pollID = this._id;
//     await mongoose.model('Option').deleteMany({ pollID });
//     await mongoose.model('Vote').deleteMany({ pollID });
//     next();
// });

const PollModel = mongoose.model<IPoll>("Poll", PollSchema);

export default PollModel;


