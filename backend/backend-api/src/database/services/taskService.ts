import { Inject, Service } from 'typedi';
import { TaskRepository } from '../Repository';
import { Logger } from 'winston';

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
    limit: any;
}
interface DeleteTask {
    taskId: string;
}

@Service()
export class TaskService {

    constructor(
        @Inject() private taskRepository: TaskRepository,
        @Inject('logger') private logger: Logger
    ) { }

    async GetAllTasks(payload: GetTasks) {

        this.logger.info(`calling taskrepo with method GetAllTasks with payload ${payload}`);

        return this.taskRepository.GetAllTasks(payload);
    };

    async CreateTask(payload: CreateTask) {

        this.logger.info(`calling taskrepo with method CreateTask with payload ${payload}`);

        return this.taskRepository.CreateTask(payload);

    };

    async UpdateTask(payload: UpdateTask) {

        this.logger.info(`calling taskrepo with method UpdateTask with payload ${payload}`);

        return this.taskRepository.UpdateTask(payload);

    }

    async DeleteTask(payload: DeleteTask) {

        this.logger.info(`calling taskrepo with method DeleteTask with payload ${payload}`);

        return this.taskRepository.DeleteTask(payload);
    }


}