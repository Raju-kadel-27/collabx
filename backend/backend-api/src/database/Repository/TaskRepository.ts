import { Inject, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { TaskModel } from "../models";
import { ITask } from "../models/Channel-tabs/Task";
import { IChannel } from "../models/Channel";

enum Priority {
    HIGH = "High",
    MEDIUM = 'Medium',
    LOW = "Low"
}

enum Status {
    TODO = 'To Do',
    INPROGRESS = 'In Progress',
    DONE = 'Done'
}

interface CreateTask {
    channelId: string;
    title: string;
    projectName: string;
    startDate: string;
    endDate: string;
    assignees: string[];
    priority: Priority.HIGH | Priority.MEDIUM | Priority.LOW;
    status: Status.TODO | Status.INPROGRESS | Status.DONE;
    progress: string;
}

interface UpdateTask {
    taskId: string;
    fieldsToUpdate: {
        _id?: string;
        title?: string;
        projectName?: string;
        startDate?: string;
        endDate?: string;
        assignees?: string[];
        priority?: Priority.HIGH | Priority.MEDIUM | Priority.LOW;
        status?: Status.TODO | Status.INPROGRESS | Status.DONE;
        progess?: string;
    }
}

interface GetTasks {
    channelId: string;
    cursor: any;
    limit: string;
}

interface DeleteTask {
    taskId: string;
}

@Service()
export class TaskRepository {

    constructor(
        @Inject('taskModel') private taskModel: Model<ITask>,
        @Inject('channelModel') private channelModel: Model<IChannel>
    ) { }


    async GetAllTasks({ channelId, cursor, limit }: GetTasks) {

        console.log({ channelId, limit, cursor });

        if (cursor == 0 || !cursor) {
            return await this.taskModel
                .find({ channelId })
                .limit(parseInt(limit) || 5)
                .populate("assignees", "name email pic")
                .exec()
        }

        return await this.taskModel
            .find({ _id: { $gt: new mongoose.Types.ObjectId(cursor) }, channelId })
            .skip(cursor ? 1 : 0)
            .limit(parseInt(limit) || 5)
            .sort({ _id: 1 })
            .populate('assignees', "name email pic")

    }

    async CreateTask({
        channelId,
        title,
        projectName,
        startDate,
        endDate,
        assignees,
        priority,
        status,
        progress
    }: CreateTask
    ) {

        console.log({ title, priority, status })


        const task = await this.taskModel.create({
            channelId,
            title,
            projectName,
            startDate,
            endDate,
            assignees,
            priority,
            status,
            progress
        })


        await this.channelModel.findByIdAndUpdate(
            channelId,
            {
                $push: { tasks: task._id }
            }
        )

        return { task }
    }

    async UpdateTask({ taskId, fieldsToUpdate }: UpdateTask) {

        const { _id, ...requiredFields } = fieldsToUpdate;

        return await this.taskModel.findByIdAndUpdate(
            _id,
            {
                $set: requiredFields
            },
            { new: true }
        )

    }


    async DeleteTask({ taskId }: DeleteTask) {
        return await this.taskModel.findByIdAndDelete(taskId);
    }

}