import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IUser } from "../models/User";

export interface IUserReturn {
    _id: string;
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: boolean;
    teams: any;
    rooms: any;
};

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUser {
    userInputDTO: IUserInputDTO;
    hashedPassword: string;
}

@Service()

export class AuthRepository {

    constructor(
        @Inject('userModel') private userModel: Model<IUser>
    ) { }

    async CreateUser({ userInputDTO, hashedPassword }: ICreateUser): Promise<any> {
        const userResult = await this.userModel.create({
            ...userInputDTO,
            password: hashedPassword,
        });
        return userResult;
    }

    async FindUser(email:string) {
        const existingUser = await this.userModel.findOne({ email }).exec();
        return existingUser;
    }

}
