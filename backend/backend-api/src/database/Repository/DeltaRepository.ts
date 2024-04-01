import { Inject } from "typedi";
import mongoose, { Model } from "mongoose";
import { IDelta } from "../models/Channel-tabs/Doc-version/Delta";
import { IDeltaHolder } from "../models/Channel-tabs/Doc-version/DeltaHolder";

interface SetupDeltaHolder {
    title: string;
    description: string;
    contributors: string[];
}
interface AddContributors {
    deltaHolderId: string;
    contributors: string[];
}
interface AddDelta {
    versionName: string;
    versionNumber: number;
    deltas: string[]
}
interface UpdateDelta {
    deltaId: string;
    updatingFields: {
        versionName?: string;
        versionNumber?: number;
    }
}
interface RemoveContributors extends AddContributors { }


export class DeltaRepository {

    constructor(
        @Inject('deltaModel') private deltaModel: Model<IDelta>,
        @Inject('deltaHolderModel') private deltaHolderModel: Model<IDeltaHolder>,
    ) { }


    async setupDeltaHolder({
        title,
        description,
        contributors
    }: SetupDeltaHolder
    ) {

        return await this.deltaHolderModel.create({
            title,
            description,
            contributors
        })
    }


    async addContributors({
        deltaHolderId,
        contributors: contributorsToAdd
    }: AddContributors
    ) {

        return await this.deltaHolderModel.findByIdAndUpdate(
            deltaHolderId,
            {
                $push: { contributors: { $each: contributorsToAdd } }
            }
        )
    }

    async removeContributors({
        deltaHolderId,
        contributors: contributorsToRemove
    }: RemoveContributors
    ) {
        return await this.deltaHolderModel.findByIdAndUpdate(
            deltaHolderId,
            {
                $pull: { contributors: { $in: contributorsToRemove } }
            }
        )
    };

    async addDelta({
        versionName,
        versionNumber,
        deltas
    }: AddDelta
    ) {
        return await this.deltaModel.create({
            versionName,
            versionNumber,
            deltas
        })
    }


    async updateDelta({
        deltaId,
        updatingFields
    }: UpdateDelta
    ) {
        return await this.deltaModel.findByIdAndUpdate(
            deltaId,
            {
                $set: updatingFields
            }
        )
    }

}