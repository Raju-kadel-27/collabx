import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { Logger } from "winston";
import { AuthService } from "../services/authService";
import config from "../../config";
// import { IUserSignInDTO, IUserSignUpDTO } from "../../types/auth";


// @desc Login
// @route POST /api/auth/login
// @access Public
export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  logger.debug("Calling Sign-In endpoint with body: %o", req.body);

  try {
    const authService = Container.get(AuthService);

    const { user, accessToken, refreshToken } = await authService.SignIn(
      req.body as any
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: config.refreshTokenExpiryInMin * 60 * 1000, //  10mins
    });

    return res.status(200).json({ user, accessToken });

  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }
};

// @desc RegisterUser
// @route POST /api/auth/register
// @access Public

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  logger.debug("Calling Sign-Up endpoint with body: %o", req.body);

  try {

    const authService = Container.get(AuthService);

    const { user, accessToken, refreshToken } = await authService.SignUp(
      req.body as any
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: config.accessTokenExpiryInMin * 60 * 1000,
    });

    return res.status(200).json({ user, accessToken });

  } catch (e) {

    logger.error("🔥 error: %o", e);
    return next(e);
  }
};

// @desc Refresh
// @route POST /api/auth/refresh
// @access Public - because accessToken has expired

export const Refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Container.get<Logger>("logger");
  logger.debug("Calling Refresh endpoint with cookie: %o", req.cookies);
  try {
    const authService = Container.get(AuthService);

    const { accessToken } = await authService.VerifyToken(req);

    res.json({ accessToken });

  } catch (err) {
    logger.error("🔥 error: %o", err);
    return next(err);
  }
};

// @desc Logout
// @route POST /api/auth/logout
// @access Public - just to clear cookie if exists
export const LogOut = (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get<Logger>("logger");
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    res.json({ message: "Cookie cleared" });

  } catch (err) {
    logger.error("🔥 error: %o", err);
    return next(err);
  }
};
