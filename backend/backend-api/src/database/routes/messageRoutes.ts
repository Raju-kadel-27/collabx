import { Router } from "express";
// import { CelebrateMiddleware } from "../../middlewares/celebrate";
import { MessageController } from "../controllers";
// import { getAllMessageSchema, sendMessageSchema } from "../../validators/message";

const route = Router()

export default (app: Router) => {
    app.use('/message', route);

    route.get('/getmessages/:chatId', MessageController.getAllMessages);
    route.get('/info/:messageId', MessageController.getMessageInfo);
    route.post('/delete', MessageController.deleteMessage);
    route.post('/sendmessage', MessageController.sendMessage);

    // /api/message/delete
}
// /message/info/${messageId}
// /api/message/sendmessage

// /api/message/getmessages/658d9fd9f71dd80f13a83617

// /api/messages/delete