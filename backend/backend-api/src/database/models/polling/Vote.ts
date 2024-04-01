import mongoose from "mongoose";

export interface IVote {
    userId: string;
    pollId: string;
    optionId: string;
    votedAt: Date;
}

const VoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Option' },
    votedAt: { type: Date, default: Date.now },
});

const VoteModel = mongoose.model<IVote>("Vote", VoteSchema);

export default VoteModel;