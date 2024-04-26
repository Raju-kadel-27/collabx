import { Router } from "express";
import { MessageController } from "../controllers";
// import { CelebrateMiddleware } from "../../middlewares/celebrate";
// import { getAllMessageSchema, sendMessageSchema } from "../../validators/message";

const route = Router()

export default (app: Router) => {
    app.use('/message', route);

    route.get('/getmessages/:chatId', MessageController.getAllMessages);
    route.get('/info/:messageId', MessageController.getMessageInfo);
    route.post('/delete', MessageController.deleteMessage);
    route.post('/sendmessage', MessageController.sendMessage);
}
