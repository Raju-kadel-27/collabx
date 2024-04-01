import mongoose from "mongoose";

export interface IOption extends Document {
    pollId: string;
    optionText: string;
    votes: string[]
}
const OptionSchema = new mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    optionText: { type: String, required: true },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
});

const OptionModel = mongoose.model<IOption>("Option", OptionSchema);

export default OptionModel;
