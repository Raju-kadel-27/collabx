import mongoose, { Document } from 'mongoose';

export interface IChannel extends Document {
    _id: string;
    name: string;
    channelMode: string;
    teamId: string;
    admins: string[];
    members: string;
    tabs: string[];
}

const ChannelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        channelMode: {
            type: String,
            default: 'Public',
            enum: ['Public', 'Private', 'Shared']
        },

        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },

        admins: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        managers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        systemPreferece: [{
            type: Boolean
        }],

        theme: {
            type: String
        },

        tabsName: [{
            type: String,
            default: 'Posts',
            enum: [
                'Posts',
                'Files',
                'Tasks',
                'Whiteboard',
                'Calendar',
                'Minute',
                'Announcement',
                'Analytics'
            ]
        }],

        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],

        files: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }],

        sharedPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SharedPost'
        }],

        sharedFiles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SharedFile'
        }],

        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }]
    },
    {
        timestamps: true
    }
);

const ChannelModel = mongoose.model<IChannel>('Channel', ChannelSchema);

export default ChannelModel;