import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { ChatService } from "../services";

export interface updateLatestMessage {
  room: string;
  messageId: string;
  messageKind: string;
  userId: string,
  roomValidation: {
    user1: string,
    user2: string
  },
  client_generated_uuid: string;
}

export interface updateLatestMessageGroup {
  room: string;
  messageId: string;
  messageKind: string;
  userId: string,
  client_generated_uuid: string;
}

export const updateLatestMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Update__latest__message__caled');
    const chatService = Container.get(ChatService);
    const newLatestMessage = await chatService
      .UpdateLatestMessage(
        req.body as
        updateLatestMessage);
    res.status(200).json(newLatestMessage);
  } catch (error) {
    next(error)
  }
}

export const updateLatestMessageGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatService = Container.get(ChatService);
    const newLatestMessageGroup = await chatService
      .UpdateLatestMessageGroup(
        req.body as
        updateLatestMessageGroup);

    res.status(200).json(newLatestMessageGroup);
  } catch (error) {
    next(error)
  }
}


// @desc Fetch all chats of user
// @route POST /api/chat/fetchallchats
// @access Private
export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const logger = Container.get<Logger>("logger");
  try {
    const chatService = Container.get(ChatService);
    const allUsers = await chatService.FetchAllUsers();

    res.status(200).json({ allUsers });

  } catch (err) {
    logger.error("🔥 error: %o", err);
    return next(err);
  }
};


// @desc Fetch all chats of user
// @route POST /api/chat/fetchallchats
// @access Private
export const fetchAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const logger = Container.get<Logger>("logger");
  try {
    const chatService = Container.get(ChatService);
    console.log('req.body', req.body)
    const allChats = await chatService.FetchAllChats(req.body);
    // const allChats = await chatService.FetchAllChats(req.userId);
    res.status(200).json({ allChats });

  } catch (err) {
    logger.error("🔥 error: %o", err);
    return next(err);
  }
};

// @desc access particular chat
// @route POST /api/chat/accesschat
// @access Private
export const accessChat = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");

  console.log(logger)

  // fetching data of all the users
  // running away from _id && always
  // showing getId

  try {

    const chatService = Container.get(ChatService);

    console.log(req.body, 'req.body')

    let payload = { ownId: req.body.ownId, peerId: req.body.peerId }
    // let payload = { ownId: req.userId, peerId: req.body.userId }

    const chat = await chatService.AccessChat(payload);

    res.status(200).json({ chat });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);

  }
};

// @desc validate room by userId and roomName
// @route POST /api/chat/validateRoom
// @access Private
export const validateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logger = Container.get<Logger>("logger");
    try {
      console.log('validateRoom__Caleed *********')
      const chatService = Container.get(ChatService);
      console.log(req.body, 'req.body');
      const chatUsers = await chatService.ValidateRoom(req.body);
      console.log({ chatUsers });
      res.status(200).json(chatUsers);
    } catch (err) {
      logger.error("🔥 error: %o", err);
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

// @desc create a chat-group
// @route POST /api/chat/creategroup
// @access Private
export const createGroupChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  try {

    const chatService = Container.get(ChatService);

    const newGroupChat = await chatService.CreateGroup(req.body);

    res.status(200).json({ newGroupChat });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);

  }
};

// @desc Rename chat-group name
// @route POST /api/chat/renamegroup
// @access Private
export const renameGroupName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");

  try {

    const chatService = Container.get(ChatService);

    const renamed = await chatService.RenameGroup(req.body);

    res.status(200).json({ renamed });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);

  }
};

// @desc Add user to chatgroup
// @route POST /api/chat/
// @access Private
export const addUserToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");

  try {
    const chatService = Container.get(ChatService);

    const addedUser = await chatService.AddToGroup(req.body);

    res.status(200).json({ addedUser });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);
  }
};

// @desc Remove user from chat-group
// @route POST /api/chat/removeuser
// @access Private
export const removeUserFromGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");

  try {

    const chatService = Container.get(ChatService);

    const removedUser = await chatService.RemoveFromGroup(req.body);

    res.status(200).json({ removedUser });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);
  }
};

// @desc delete group from chats 
// @route POST /api/chat/deleteGroup
// access Private
export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");

  try {
    const chatService = Container.get(ChatService);

    const deletedGroup = await chatService.DeleteGroup(req.body);

    res.status(200).json({ deletedGroup });

  } catch (err) {

    logger.error("🔥 error: %o", err);

    return next(err);
  }
}
