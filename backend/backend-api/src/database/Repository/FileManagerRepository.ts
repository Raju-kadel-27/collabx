import { Inject, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { IFile } from "../models/Channel-tabs/Files/File";
import { IFolder } from "../models/Channel-tabs/Files/Folder";

interface GetFolders {
    channelId: string;
    isRootFolder: boolean;
}

interface GetFolderDetails {
    folderId: string;
}

interface CreateFolder {
    parentFolderId?: number;
    isRootFolder: boolean;
    folderName: string;
    channelId: string;
    createdBy: string;
}

interface AddFile {
    channelId: string;
    parentFolderId: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    isProtected: boolean;
    size: string;
    createdBy: string;
}

interface DeleteFolder {
    folderId: string;
}

interface DeleteFile {
    parentFolderId?: string;
    fileId: string;
}

interface UpdateFile {
    fileId: string;
    fieldsToUpdate: {
        fileName?: string;
        isProtected?: boolean;
    }
}

interface UpdateFolderName {
    folderId: string;
    newFolderName: string;
}

interface CopyFile {
    fileId: string;
    newFolderId: string;
}

interface MoveFile extends CopyFile {
    prevFolderId: string;
}

@Service()
export class FileRepository {

    constructor(
        @Inject('fileModel') private fileModel: Model<IFile>,
        @Inject('folderModel') private folderModel: Model<IFolder>,
    ) { }


    async getRootFolders({ channelId, isRootFolder }: GetFolders) {
        return await this.folderModel.find({ channelId, isRootFolder })
            .populate('subFolders')
            .populate('files')
    };


    async getFolderDetails({ folderId }: GetFolderDetails) {
        console.log({ folderId })
        return await this.folderModel.findById(folderId)
            .populate('subFolders')
            .populate('files')
    };

    
    async createFolder(
        { parentFolderId,
            isRootFolder,
            folderName,
            channelId,
            createdBy
        }: CreateFolder
    ) {
        // create folder first and push that new folderId into its parents subfolders
        if (parentFolderId) {

            const newFolder = await this.folderModel.create({
                folderName,
                isRootFolder,
                channelId,
                parentFolderId,
                createdBy
            })

            await this.folderModel.findByIdAndUpdate(
                parentFolderId,
                { $push: { subFolders: newFolder._id } }
            )

            return newFolder
        }

        return await this.folderModel.create({
            folderName,
            isRootFolder,
            channelId,
            createdBy
        });

    };


    async addFile(
        {
            channelId,
            parentFolderId,
            fileName,
            fileType,
            fileUrl,
            isProtected,
            size,
            createdBy
        }: AddFile
    ) {
        const newFile = await this.fileModel.create({
            channelId,
            parentFolderId,
            fileName,
            fileType,
            fileUrl,
            isProtected,
            size,
            createdBy
        });

        if (parentFolderId) {

            await this.folderModel.findByIdAndUpdate(
                parentFolderId,
                { $push: { files: newFile._id } }
            )
        }

        return newFile;

    };

    async updateFile({ fileId, fieldsToUpdate }: UpdateFile) {

        console.log({ fileId, fieldsToUpdate });

        return await this.fileModel.findByIdAndUpdate(
            fileId,
            fieldsToUpdate,
            { new: true }
        )

    };


    async updateFolderName({ folderId, newFolderName }: UpdateFolderName) {

        return await this.folderModel.findByIdAndUpdate(
            folderId,
            {
                $set: { folderName: newFolderName }
            }
        )
    };


    async deleteFile({ fileId, parentFolderId }: DeleteFile) {

        if (!parentFolderId) {
            console.log('no parent folder Id');
            return await this.fileModel.findByIdAndDelete(fileId);
        }

        const session = await mongoose.startSession();

        session.startTransaction()
        console.log('parent folder Id');

        try {
            await Promise.all([
                await this.fileModel.findByIdAndDelete(fileId),

                await this.folderModel.findByIdAndUpdate(
                    parentFolderId,
                    { $pull: { files: fileId } }
                )
            ])

            await session.commitTransaction();

            return { message: 'Deleted successfully' }

        } catch (error) {

            await session.abortTransaction();

        }
        finally {
            await session.endSession();
        }
    };


    async deleteFolder({ folderId }: DeleteFolder) {

        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const folder: any = await this.folderModel.findById(folderId);
            let subFolders = folder.subFolders;
            let files = folder.files;
            console.log({ folder, subFolders })
            await Promise.all([

                await this.folderModel.findByIdAndUpdate(
                    folderId,
                    { $set: { subFolders: [] } }
                ),

                ...subFolders
                    .map(async (id: number) =>
                        await this.folderModel.findByIdAndDelete(id)),

                ...files
                    .map(async (id: number) =>
                        await this.folderModel.findByIdAndDelete(id))

            ])

            await session.commitTransaction();
            return { message: 'Delete successfully' }

        } catch (error) {
            await session.abortTransaction();
        }
        finally {
            await session.endSession();
        }

    };


    async copyFile(
        {
            fileId,
            newFolderId,

        }: CopyFile
    ) {
        return await this.folderModel.findByIdAndUpdate(
            newFolderId,
            { $push: { files: { $each: fileId } } },
            { new: true }
        )

    };


    async moveFile(
        {
            prevFolderId,
            fileId,
            newFolderId,
        }: MoveFile
    ) {

        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            await Promise.all([

                await this.folderModel.findByIdAndUpdate(
                    prevFolderId,
                    { $pull: { files: { $in: fileId } } }
                ),

                await this.folderModel.findByIdAndUpdate(
                    newFolderId,
                    { $push: { files: { $each: fileId } } },
                    { new: true }
                )
            ])

            await session.commitTransaction();

            return { message: "Moved Successfull" }

        } catch (error) {
            // this.logger.error('Error %o', error);
            await session.abortTransaction();
        }
        finally {
            await session.endSession();
        }
    };

}


