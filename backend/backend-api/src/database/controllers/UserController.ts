import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { UserService } from "../services/userService";

interface SearchUserPayload {
    keyword: string;
    userId: string;
}


// @desc Send message
// @route POST /api/user/search
// @access Private
export const searchUser = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {

        const logger = Container.get<Logger>("logger");
        try {
            const userService = Container.get(UserService);
            const keyword = req.query.search;
            const users = await userService.searchAllUsers({ keyword, userId: req.userId } as SearchUserPayload);
            return { users };
        } catch (err) {
            logger.error("Error : %o", err);
            next(err);
        }
    }
    catch (e) {
        console.log("Error : ", e);
    }
};
