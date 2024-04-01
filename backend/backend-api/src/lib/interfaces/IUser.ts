export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    salt: string;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}

export interface IUserSignInDTO {
    email: string;
    password: string;
}