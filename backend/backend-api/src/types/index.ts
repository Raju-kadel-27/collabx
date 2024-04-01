export interface dependencyInjectorParams {
  mongoConnection: any;
  models: { name: string; model: any }[];
  repositories: { name: string; repository: any }[];
}

export interface modelTypes {
  MessageModel: any;
  ChatModel: any;
  UserModel: any;
}


// Token related types

