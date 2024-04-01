import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { MessageService } from "../services";

interface IMessageInput {
  client_generated_uuid: string;
  chat: string;
  room: string;
  type: string;
  content: string;
  user1_last_read_message: string;
  user2_last_read_message: string;
  publicKey: string;
  sender: string;
}

interface IDeleteMessage {
  messageId: string;
  room: string;
  client_generated_uuid: string;
}

// @desc Send message
// @route POST /api/message/sendmessage
// @access Private
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  try {
    const messageService = Container.get(MessageService);
    console.log(req.body, 'req.body.sendMessage');
    const message = await messageService.SendMessage(req.body as IMessageInput);
    res.status(200).json({ message });
  } catch (err) {
    logger.error("Error : %o", err);
    next(err);
  }
};

// @desc Send message
// @route POST /api/message/sendmessage
// @access Private
export const getMessageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  try {
    const messageService = Container.get(MessageService);
    const messageId = req.params.messageId;
    console.log(messageId, 'req.params.getMessageInfo');
    const message = await messageService.GetMessage(messageId as string);
    res.status(200).json(message);
  } catch (err) {
    logger.error("Error : %o", err);
    next(err);
  }
};

// @desc Send message
// @route POST /api/message/sendmessage
// @access Private
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  try {
    const messageService = Container.get(MessageService);
    console.log(req.body, 'req.body')
    const message = await messageService
      .DeleteMessage(req.body as
        IDeleteMessage);
    res.status(200).json({ message });
  } catch (err) {
    logger.error("Error : %o", err);
    next(err);
  }
};



// @desc Get all messages
// @route GET /api/message/getallmessages
// @access Private
export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  try {
    const messageService = Container.get(MessageService);
    let chatId: string | undefined = req.params.chatId as string | undefined;

    logger.info("**************************");
    console.log({ chatId })
    logger.info('**************************');

    if (chatId) {
      const allMessages = await messageService.GetAllMessages(chatId);
      res.status(200).json(allMessages);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    logger.error("Error : %o", err);
    next(err);
  }
};
