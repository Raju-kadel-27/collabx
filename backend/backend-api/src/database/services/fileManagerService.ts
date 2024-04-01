import { Inject, Service } from "typedi";
import { FileRepository } from "../Repository";

interface GetFolders {
    channelId: string;
}
interface GetFoldersDetails {
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
    fileUrl: string;
    parentFolderId: string;
    fileName: string;
    fileType: string;
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
export class FileService {

    constructor(@Inject() private fileRepository: FileRepository) { }

    async GetRootFolders(payload: GetFolders) {

        const { channelId } = payload;

        return await this.fileRepository.getRootFolders({ channelId, isRootFolder: true });
    }


    async GetFolderDetails(payload: GetFoldersDetails) {

        const { folderId } = payload;
        console.log({folderId})
        return await this.fileRepository.getFolderDetails({ folderId });
    }


    async CreateFolder(payload: CreateFolder) {

        const { parentFolderId, isRootFolder, folderName, channelId, createdBy } = payload;

        if (parentFolderId) {
            return await this.fileRepository.createFolder({
                parentFolderId,
                isRootFolder,
                folderName,
                channelId,
                createdBy
            })
        }
        else {
            return await this.fileRepository.createFolder({
                isRootFolder,
                folderName,
                channelId,
                createdBy
            })
        }
    }


    async AddFile(payload: AddFile) {

        const { channelId, fileName, fileUrl, parentFolderId, fileType, isProtected, size, createdBy } = payload;

        return await this.fileRepository.addFile({
            channelId,
            fileName,
            parentFolderId,
            fileType,
            fileUrl,
            isProtected,
            size,
            createdBy
        })
    }


    async UpdateFile(payload: UpdateFile) {

        const { fileId, fieldsToUpdate } = payload;

        return await this.fileRepository.updateFile({
            fileId,
            fieldsToUpdate
        });
    }


    async UpdateFolderName(payload: UpdateFolderName) {

        const { folderId, newFolderName } = payload;

        return await this.fileRepository.updateFolderName({
            folderId,
            newFolderName
        });
    }


    async DeleteFile(payload: DeleteFile) {

        const { fileId, parentFolderId } = payload;

        return await this.fileRepository.deleteFile({ fileId, parentFolderId });

    }


    async DeleteFolder(payload: DeleteFolder) {

        const { folderId } = payload;

        return await this.fileRepository.deleteFolder({ folderId });
    }


}
