import { Model } from "mongoose";
import { Inject } from "typedi";
import { IUser } from "../models/User";

interface SearchUserPayload {
  keyword: string;
  userId: string;
}

export class UserRepository {
  constructor(
    @Inject('userModel') private userModel: Model<IUser>,
  ) { }

  async searchAllUsers(payload: SearchUserPayload) {
    const { keyword, userId } = payload;
    let search = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ]
    }
    return await this.userModel
      .find(search)
      .find({ _id: { $ne: userId } });
  }

}
