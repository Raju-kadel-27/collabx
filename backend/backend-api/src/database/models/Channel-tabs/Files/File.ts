import mongoose, { Document } from 'mongoose';

export interface IFile extends Document {
    channelId: string;
    parentFolderId: string;
    fileName: string;
    fileType: string;
    isProtected: boolean;
    size: string;
    createdBy: string
};

export const FileSchema = new mongoose.Schema(

    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            index: true,
        },

        parentFolderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',
            default: 0
        },

        fileName: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true
        },

        fileType: {
            type: String,
            required: true,
        },

        isProtected: {
            type: Boolean,
            required: true,
            default: false
        },

        size: {
            type: String,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

    },
    {
        timestamps: true
    }

)

const FileModel = mongoose.model<IFile>('File', FileSchema);

export default FileModel;