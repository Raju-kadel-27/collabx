import Container from "typedi";
import { Request, Response, NextFunction } from 'express';
import { ChannelService } from "../services";

export const getAllMembers =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const { members } = await channelService.GetAllMembers(req.body);
      res.status(200).json(members);
    } catch (error) {
      console.log("Error occured in the main flow of the current stack trace %-o")
      next(error)
    }
  }

export const createChannel =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const { created } = await channelService.CreateChannel(req.body);
      res.status(200).json(created);
    } catch (error) {
      console.log("Error occured in the main flow of the current stack trace %-o")
      next(error)
    }
  }

export const updateChannelName =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        name: req.body.name
      }
      const { updated } = await channelService.UpdateName(payload);
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }

export const addChannelMember =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        members: req.body.members
      }
      const { updated } = await channelService.AddMember(payload);
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }

export const removeChannelMember =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        members: req.body.members
      }
      const { updated } = await channelService.RemoveMember(payload);
      res.status(200).json(updated);

    } catch (error) {
      next(error)
    }
  }

export const addChannelAdmin =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        admins: req.body.admins
      }
      const { updated } = await channelService.AddAdmin(payload);
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }

export const removeChannelAdmin =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        admins: req.body.admins
      }
      const { updated } = await channelService.RemoveAdmin(payload)
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }

export const addChannelTab =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        tabs: req.body.tabs
      }
      const { updated } = await channelService.AddTab(payload)
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }


export const removeChannelTab =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const payload = {
        channelId: req.params.channelId,
        tabs: req.body.tabs
      }
      const { updated } = await channelService.RemoveTab(payload)
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }


export const deleteChannel =
  async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const channelService = Container.get(ChannelService);
      const channelId = req.params.channelId
      await channelService.DeleteChannel({ channelId })
      res.status(200).json({ message: 'Success ! Deletion' });
    } catch (error) {
      next(error)
    }
  }

