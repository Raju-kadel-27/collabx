import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { FileService } from "../services";


// @desc Send message
// @route POST /api/file/getfolders
// @access Private
export const getRootFolders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const files = await fileService.GetRootFolders({ channelId: req.params.channelId })

        res.status(200).json(files);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};


// @desc Send message
// @route POST /api/file/getfolders
// @access Private
export const getFolderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const files = await fileService.GetFolderDetails({ folderId: req.params.folderId })

        res.status(200).json(files);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};




// @desc Create folder
// @route /api/file/createfolder
// @access Private
export const createFolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const newFolder: any = await fileService.CreateFolder(req.body)

        res.status(200).json(newFolder);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};



export const addFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const newFile: any = await fileService.AddFile(req.body);

        res.status(200).json(newFile);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};



export const updateFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const updatedFile: any = await fileService.UpdateFile(req.body);

        res.status(200).json(updatedFile);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};



export const updateFolderName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);

        const updatedFolder: any = await fileService.UpdateFolderName(req.body);

        res.status(200).json(updatedFolder);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
};



export const deleteFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('reached point 1')
    const logger = Container.get<Logger>("logger");
    try {
        const fileService = Container.get(FileService);
        console.log(req.body);
        const updatedFolder: any = await fileService.DeleteFile(req.body);

        res.status(200).json(updatedFolder);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
}


export const deleteFolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logger = Container.get<Logger>("logger");

    try {

        const fileService = Container.get(FileService);

        const deletedFolder: any = await fileService.DeleteFolder(req.body);

        res.status(200).json(deletedFolder);

    } catch (err) {
        logger.error("Error : %o", err);
        next(err);
    }
}
