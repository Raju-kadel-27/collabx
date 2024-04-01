import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { DeltaService } from "../services";

export const SetupDeltaHolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const deltaService = Container.get(DeltaService);
        const  setuped :any = await deltaService.SetupDeltaHolder(req.body);
        res.status(200).json(setuped);

    } catch (err) {
        logger.error("🔥 error: %o", err);
        return next(err);
    }
};



export const AddContributors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const deltaService = Container.get(DeltaService);
        const  addedContributors :any = await deltaService.SetupDeltaHolder(req.body);
        res.status(200).json(addedContributors);

    } catch (err) {
        logger.error("🔥 error: %o", err);
        return next(err);
    }
};



export const RemoveContributors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const deltaService = Container.get(DeltaService);
        const  removedContributors :any = await deltaService.RemoveContributors(req.body);
        res.status(200).json(removedContributors);

    } catch (err) {
        logger.error("🔥 error: %o", err);
        return next(err);
    }
};



export const AddDelta = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const logger = Container.get<Logger>("logger");
        try {
            const deltaService = Container.get(DeltaService);
            const  newDelta :any = await deltaService.AddDelta(req.body);
            res.status(200).json(newDelta);

        } catch (err) {
            logger.error("🔥 error: %o", err);
            return next(err);
        }
    } catch (e) {
        console.log('Unable to log: error', e)
    }
};




export const UpdateDelta = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const logger = Container.get<Logger>("logger");
    try {
        const deltaService = Container.get(DeltaService);
        const updatedDelta :any = await deltaService.UpdateDelta(req.body);
        res.status(200).json(updatedDelta);

    } catch (err) {
        logger.error("🔥 error: %o", err);
        return next(err);
    }
};
