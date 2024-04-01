import mongoose from "mongoose";

export interface IDelta extends Document {
    versionName: string;
    versionNumber: string;
    deltas: string;
}

const DeltaSchema = new mongoose.Schema({

    versionName: {
        type: String,
        required: true
    },

    versionNumber: {
        type: Number,
        required: true
    },

    deltas: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Delta = mongoose.model<IDelta>('Delta', DeltaSchema);

export default Delta;
