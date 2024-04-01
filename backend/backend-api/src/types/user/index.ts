export interface GetAllUsers {
    userId: string;
    keyword: string;
  }
  
  export interface CreateUser {
    name: string;
    email: string;
    password: string;
    pic: string;
  }
  
  export interface SearchUser {
    userId: string;
    keyword: string;
  }
  
  export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    pic: string;
  }
  
  export interface LoginUser {
    email: string;
    password: string;
  }
  