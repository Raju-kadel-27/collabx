import { Inject, Service } from "typedi";
import { DeltaRepository } from "../Repository/DeltaRepository";

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
    deltas: string[];
}
interface UpdateDelta {
    deltaId: string;
    updatingFields: {
        versionName?: string;
        versionNumber?: number;
    }
}
interface RemoveContributors extends AddContributors { }


@Service()
export class DeltaService {
    constructor(@Inject() private deltaRepository: DeltaRepository) { }

    async SetupDeltaHolder(payload: SetupDeltaHolder) {
        return await this.deltaRepository.setupDeltaHolder(payload);
    }

    async AddContributors(payload: AddContributors) {
        return await this.deltaRepository.addContributors(payload);
    }

    async RemoveContributors(payload: RemoveContributors) {
        return await this.deltaRepository.removeContributors(payload);
    }

    async AddDelta(payload: AddDelta) {
        return await this.deltaRepository.addDelta(payload);
    }

    async UpdateDelta(payload: UpdateDelta) {
        return await this.deltaRepository.updateDelta(payload);
    }

}