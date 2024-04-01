import { Joi } from "celebrate";

// route.get('/fetchchats', CelebrateMiddleware(''), ChatController.fetchAllChats);
// route.post('/accesschat', CelebrateMiddleware(''), ChatController.accessChat);
// route.post('/creategroup', CelebrateMiddleware(''), ChatController.createGroupChat);
// route.post('/renamegroup', CelebrateMiddleware(''), ChatController.renameGroupName);
// route.post('/deletegroup', CelebrateMiddleware(''), ChatController.deleteGroup)
// route.post('/adduser', CelebrateMiddleware(''), ChatController.addUserToGroup);
// route.post('/removeuser', CelebrateMiddleware(''), ChatController.removeUserFromGroup);

export const fetchAllChatsSchema = Joi.object({
    chatId: Joi.string().required()
})
export const accessChatSchema = Joi.object({

})
export const createGroupChat = Joi.object({
    
})



