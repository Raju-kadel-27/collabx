export interface AccessToken {
  id: string;
  userName: string;
  roles: [string];
}

export interface RefreshToken {
  id: string;
  userName: string;
  roles: [string];
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserSignUpDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: IUserSignUpDTO;
  accessToken: string;
}

export interface IUserSignInDTO {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
