import { Router } from "express";
import { ChatController } from "../controllers";

export function handleMakerFunction() {
    try {
        console.log('HandleMakerFunction');
    } catch (error) {
        console.log({ error })
    }
}

const route = Router()

export default (app: Router) => {

    app.use('/chats', route);

    route.get('/fetchallusers', ChatController.fetchAllUsers);
    route.post('/fetchchats', ChatController.fetchAllChats);
    route.post('/accesschat', ChatController.accessChat);
    route.post('/creategroup', ChatController.createGroupChat);
    route.post('/renamegroup', ChatController.renameGroupName);
    route.post('/adduser', ChatController.addUserToGroup);
    route.post('/removeuser', ChatController.removeUserFromGroup);
    route.post('/deletegroup', ChatController.deleteGroup);
    route.post('/validateroom', ChatController.validateRoom);
    route.post('/update/latestmessage', ChatController.updateLatestMessage);
    route.post('/update/latestmessage/group', ChatController.updateLatestMessageGroup);
}
