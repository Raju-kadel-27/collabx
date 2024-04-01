import mongoose, { Model, Document } from 'mongoose';

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

export interface ITask extends Document {
    _id: string;
    channelId: string;
    title: string;
    assignedTo: string[];
    priority?: Priority.High | Priority.Medium | Priority.Low;
    status?: Status.ToDo | Status.InProgress | Status.Done;
    assignedAt: string;
    due: string;
    bucket?: string;
}

const TaskSchema = new mongoose.Schema(

    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            index: true,
        },

        title: {
            type: String,
            required: [true, 'Please enter your title']
        },

        projectName: {
            type: String,
            required: [true, 'please provide valid project name'],
            default: 'Unknown'
        },

        startDate: {
            type: Date,
            default: Date.now()
        },

        endDate: {
            type: Date,
            default: Date.now()
        },

        priority: {
            type: String,
            required: false,
            enum: ['High', 'Medium', 'Low']
        },

        status: {
            type: String,
            required: false,
        },

        assignees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }

    },

    {
        timestamps: true
    }
)

const TaskModel = mongoose.model<ITask>('Task', TaskSchema);

export default TaskModel;