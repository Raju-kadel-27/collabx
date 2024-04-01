import mongoose, { Model, Document } from 'mongoose';

export interface IMinute extends Document {
    channelId: string;
    title: string;
    minuteContent: string;
    createdBy: string;
};

const MinuteSchema = new mongoose.Schema(

    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            index: true,
        },

        title: {
            type: String,
            required: [true, 'Please enter your title']
        },

        minuteContent: {
            type: String,
            required: [true, 'Please add minute content']
        },

        createdBy: {
            type: String
        },

    },
    {
        timestamps: true
    }

);

const MinuteModel = mongoose.model<IMinute>('Minute', MinuteSchema);

export default MinuteModel;