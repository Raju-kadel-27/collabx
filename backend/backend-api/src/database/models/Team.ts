import { NextFunction } from 'express';
import mongoose, { Document, Error, Model } from 'mongoose';
import Container, { Service } from 'typedi';

export interface ITeam extends Document {
    name: string;
    members: string;
    channels: string;
    owners: string[];
}

const TeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: [true, 'Please enter your full name'],
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        channels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Channel'
            }
        ],
        owners: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },

    { timestamps: true }
);


TeamSchema.pre('save', async function (next) {

    if (this.isNew) {

        const channelModel = Container.get<any>('channelModel')

        const generalChannel = new channelModel({ name: 'General' });

        try {
            const savedGeneralChannel = await generalChannel.save();

            this.channels.push(savedGeneralChannel._id);

            next();

        } catch (error: any) {
            next(error);
        }

    } else {
        next();
    }
});

const TeamModel = mongoose.model<ITeam>('Team', TeamSchema);

export default TeamModel;