import mongoose, { Document } from "mongoose";

export interface IDeltaHolder extends Document {
    title: string;
    description: string;
    contributors: string[];
    versionDeltas: string[];
};

const DeltaHolderSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    contributors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    // Store version deltas
    versionDeltas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DeltaHolder'
        }
    ],

});

const DeltaHolder = mongoose.model<IDeltaHolder>('DeltaHolder', DeltaHolderSchema);

export default DeltaHolder;
