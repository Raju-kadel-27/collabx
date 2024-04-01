import { Router } from "express";
import { FileController } from "../controllers";

const route = Router()

export default (app: Router) => {

    app.use('/file-manager', route);

    route.get('/get/rootfolders/:channelId', FileController.getRootFolders);
    route.get('/get/folderdetails/:folderId', FileController.getFolderDetails);
    route.post('/createfolder', FileController.createFolder);
    route.post('/update/foldername', FileController.updateFolderName);
    route.post('/addfile', FileController.addFile);
    route.post('/updateFile', FileController.updateFile);
    route.post('/deletefile', FileController.deleteFile);
    route.post('/deletefolder', FileController.deleteFolder);

}
