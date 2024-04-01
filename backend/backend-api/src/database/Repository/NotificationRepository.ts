import { TeamModel } from "../models";
import uuid from 'uuid';
import { Inject } from "typedi";

export class NotificationRepository {

    constructor(
        @Inject() private teamModel: typeof TeamModel
    ) { }

    async createRoom() {
        try {

            // remember your roomId is objectId of mongoose model in video chat
            // use room-model to create a new room taking parameters
            // return roomId

        } catch (error) {
            console.log({ error })
        }
    }

    async deleteRoom() {
        try {
            // delete using roomId

        }
        catch (error) {
            console.log({ error })
        }
    }

}