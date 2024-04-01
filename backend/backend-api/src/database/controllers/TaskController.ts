import Container from "typedi";
import { Request, Response, NextFunction } from 'express'
import { TaskService } from "../services";

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

interface UpdateTask {
    taskId: string;
    fieldsToUpdate: {
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

export const getAllTasks =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const taskService = Container.get(TaskService);

            const { channelId } = req.params;

            const { limit, cursor } = req.query;
            console.log({limit,cursor})

            const allTasks = await taskService.GetAllTasks({ channelId, limit, cursor });

            res.status(200).json(allTasks);

        } catch (error) {

            console.log({ error })
        }
    }


export const createTask =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const taskService = Container.get(TaskService);

            const newTask = await taskService.CreateTask(req.body);

            res.status(200).json(newTask);

        } catch (error) {
            next(error)
        }
    }


export const updateTask =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const taskService = Container.get(TaskService);
            const payload: UpdateTask = {
                taskId: req.params.taskId,
                fieldsToUpdate: req.body
            }

            console.log({ payload }, "********")

            const newTask = await taskService.UpdateTask(payload);

            res.status(200).json(newTask);

        } catch (error) {
            next(error)
        }
    }


export const deleteTask =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const taskService = Container.get(TaskService);

            const taskId = req.params.taskId

            const newTask = await taskService.DeleteTask({ taskId });

            res.status(200).json(newTask);

        } catch (error) {
            next(error)
        }
    }

