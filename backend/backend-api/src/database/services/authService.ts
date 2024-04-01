import bcrypt from "bcrypt";
import { Request } from "express";
import { Inject, Service } from "typedi";
import { AuthRepository } from "../Repository";
import { Logger } from "winston";
import config from "../../config";
import {
  formatUser,
  generateToken,
  verifyJWT,
} from "../../lib/helpers/generateToken";


@Service()
export class AuthService {
  constructor(
    @Inject() private authRepository: AuthRepository,
    @Inject("logger") private logger: Logger
  ) { }

  async SignUp(userInputDTO: any): Promise<any> {

    const hashedPassword = await bcrypt.hash(userInputDTO.password, 10);

    const userRecord = await this.authRepository.CreateUser({
      userInputDTO,
      hashedPassword,
    });

    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    const formatted = formatUser(userRecord);

    const accessToken = generateToken(formatted, config.accessTokenSecret, 2); // 2min expiry

    const refreshToken = generateToken(formatted, config.refreshTokenSecret, 30); // 30min expiry

    const user = userRecord.toObject();

    Reflect.deleteProperty(user, "password");

    return { user, accessToken, refreshToken };
  }

  async SignIn(userInputDTO: any): Promise<any> {
    const { email, password } = userInputDTO;

    const foundUser = await this.authRepository.FindUser(email);
    if (!foundUser) throw new Error("User does not exists.");

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new Error("Unauthorized");

    const formatted = formatUser(foundUser);

    const accessToken = generateToken(formatted, config.accessTokenSecret, 2); // 2min expiry

    const refreshToken = generateToken(formatted, config.refreshTokenSecret, 30); // 30min expiry

    const user = foundUser.toObject();

    Reflect.deleteProperty(user, "password");

    return { user, accessToken, refreshToken };
  }

  async VerifyToken(req: Request) {
    const cookies = req.cookies as any;

    if (!cookies?.jwt) throw new Error("Unauthorized");

    const refreshToken = cookies?.jwt;

    const { accessToken } = await verifyJWT(refreshToken);

    return { accessToken };
  }
}
