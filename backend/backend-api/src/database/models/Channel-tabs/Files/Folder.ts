import mongoose, { Document, mongo } from "mongoose";

export interface IFolder extends Document {
    folderName: string;
    channelId: string;
    parentFolderId: string;
    subFolders: string[];
    files: string[];
    createdBy: string;
};

const FolderSchema = new mongoose.Schema(
    {

        folderName: {
            type: String,
            required: true
        },

        channelId: {
            type: mongoose.Schema.Types.ObjectId,

        },

        parentFolderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',
        },

        isRootFolder:{
            type: Boolean,
            default:false
        },

        subFolders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Folder'
            }
        ],

        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'File'
            }
        ],

        createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        }

    },
    {
        timestamps: true
    }
);

const FolderModel = mongoose.model<IFolder>("Folder", FolderSchema);

export default FolderModel;
