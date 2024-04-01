import Container from "typedi";
import { Request, Response, NextFunction } from 'express'
import { TeamService } from "../services/teamService";
import { Logger } from "winston";

// @params request,response,nextFunction
// @access PUBLIC
// @route /api/teams/getTeamsByUserId
export const getAllTeamMembers =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const teamService = Container.get(TeamService);
            const teamId=req.params.teamId;
            const { teams } = await teamService.GetAllTeamMembers({teamId});
            res.status(200).json(teams);
        } catch (error) {
            next(error)
        }
    }

// @params request,response,nextFunction
// @access PUBLIC
// @route /api/teams/getTeamsByUserId
export const getTeamsByUserId =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const teamService = Container.get(TeamService);
            const { teams } = await teamService.GetTeamsByUserId(req.body)
            res.status(200).json(teams);
        } catch (error) {
            next(error)
        }
    }

// @params req,res,next
// @access PRIVATE
// @route /api/teams/create
export const createTeam =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {

        try {
            const logger = Container.get<Logger>('logger');
            logger.error("## Sending body in request ##");
            console.log(req.body);
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.CreateTeam(req.body)
            res.status(200).json(updatedTeam);
        } catch (error) {
            next(error)
        }
    }


// @params req,res,next
// @access PRIVATE
// @route /api/teams/create
export const updateTeamName =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.UpdateName(req.body)
            res.status(200).json(updatedTeam);
        } catch (error) {
            next(error)
        }
    }


// @params req,res,next
// @access PRIVATE
// @route /api/teams/create
export const addTeamMember =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.AddMembers(req.body)
            res.status(200).json(updatedTeam);

        } catch (error) {
            next(error)
        }
    }


// @params req,res,next
// @access PRIVATE
// @route /api/teams/create
export const deleteTeamMember =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.RemoveMembers(req.body)
            res.status(200).json(updatedTeam);


        } catch (error) {
            next(error)
        }
    }

// @params req,res,next
// @access PRIVATE
// @route /api/teams/addTeamChannel
export const addTeamChannel =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.AddChannels(req.body)
            res.status(200).json(updatedTeam);


        } catch (error) {
            next(error)
        }
    }


export const deleteTeamChannel =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.RemoveChannels(req.body)
            res.status(200).json(updatedTeam);
        } catch (error) {
            next(error)
        }
    }


export const addTeamOwner =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.AddOwners(req.body)
            res.status(200).json(updatedTeam);
        } catch (error) {
            next(error)
        }
    }

export const deleteTeamOwner =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            const updatedTeam = await teamService.RemoveOwners(req.body)
            res.status(200).json(updatedTeam);
        } catch (error) {
            next(error)
        }
    }

export const deleteTeam =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const teamService = Container.get(TeamService);
            await teamService.DeleteTeam(req.body);
            res.status(200).json({ message: 'Team deleted successfully' });
        } catch (error) {
            next(error)

        }
    }