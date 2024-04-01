import mongoose, { Document } from 'mongoose';

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
export interface Reaction {
    emoji: string;
    userIds: string[];
};
export interface Replies {
    authorId: string;
    content: string;
    createdAt: string;
};
export interface Attachment {
    url: string;
    type: string;
};
export interface ReactionsCount {
    insightful: Number;
    celebrate: Number;
    love: Number;
    wow: Number;
    angry: Number;
    sad: Number;
}
export interface IPost extends Document {
    teamId: string;
    sharedChannels: { name: string; channelId: string; }
    channelId: string;
    authorId: string;
    content: string;
    attachments: Attachment[];
    reactions: Reaction[];
    reactionsCount: ReactionsCount;
    replies: Replies[];
};

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reactionType: {
        type: String,
        enum:
            [
                'celebrate',
                'love',
                'insightful',
                'wow',
                'angry',
                'sad'
            ]
    }
}, { timestamps: true });

const PostSchema = new mongoose.Schema(
    {
        teamId: {
            type: String,
            // required: true
        },

        sharedChannels: [
            {
                name: String,
                channelId: String
            }
        ],

        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        },

        authorId: {
            type: String,
            ref:'User'
            // required: true,
        },

        content: {
            type: String,
            // required: true,
        },

        reactions: [reactionSchema], // cascade on delete

        reactionsCount: {

            insightful: { type: Number, default: 0 },
            celebrate: { type: Number, default: 0 },
            love: { type: Number, default: 0 },
            wow: { type: Number, default: 0 },
            angry: { type: Number, default: 0 },
            sad: { type: Number, default: 0 },
        },

        attachments: [
            {
                url: String,
                type: String,
            },
        ],

        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Replies',
                default: null
            },
        ],

    },

    {
        timestamps: true
    }
)

// First you have to perform getPostById
// Then use these methods to ( inc or dec ) reactions and finally save in db
// So, multiple round trips (may cause performance issues)
// One soln is to do findByIdAndUpdate and use db opeartors like ( $INC, $DEC ) to update reactionCounts.
PostSchema.methods.incrementReactionCount = function (reactionType: string) {
    if (this.reactionsCount.hasOwnProperty(reactionType)) {
        this.reactionsCount[reactionType]++
    }
}


PostSchema.methods.decrementReactionCount = function (reactionType: string) {

    if (this.reactionsCount.hasOwnProperty(reactionType) && this.reactionsCount[reactionType] > 0) {
        this.reactionsCount[reactionType]--
    }
}

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;