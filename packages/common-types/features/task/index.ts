enum Priority {
    High,
    Medium,
    Low
}

enum Status {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done'
}

export interface CreateTask {
    channelId: string;
    title: string;
    projectName: string;
    startDate: string;
    endDate: string;
    assignees: string[];
    priority: Priority.High | Priority.Medium | Priority.Low;
    status: Status.ToDo | Status.InProgress | Status.Done;
    progress: string;
}

export interface UpdateTask {
    taskId: string;
    fieldsToUpdate: {
        title?: string;
        projectName?: string;
        startDate?: string;
        endDate?: string;
        assignees?: string[];
        priority?: Priority.High | Priority.Medium | Priority.Low;
        status?: Status.ToDo | Status.InProgress | Status.Done;
        progess?: string;
    }
}

export interface GetTasks {
    channelId: string;
}

export interface DeleteTask {
    taskId: string;
}