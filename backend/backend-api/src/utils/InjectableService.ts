import {
    MessageModel,
    RowModel,
    RepliesModel,
    UserModel,
    ChatModel,
    ChannelModel,
    TaskModel,
    TeamModel,
    PostModel,
    FileModel,
    FolderModel,
    AnnouncementModel,
    SharedPostModel,
    NotificationModel,
    PollModel,
    OptionModel,
    VoteModel
} from '../database/models';

export const models = [
    {
        name: 'messageModel',
        model: MessageModel
    },
    {
        name: 'repliesModel',
        model: RepliesModel
    },
    {
        name: 'announcementModel',
        model: AnnouncementModel
    },
    {
        name: 'messageModel',
        model: MessageModel
    },
    {
        name: 'sharedPostModel',
        model: SharedPostModel
    },
    {
        name: 'rowModel',
        model: RowModel
    },
    {
        name: 'notificationModel',
        model: NotificationModel
    },
    {
        name: 'folderModel',
        model: FolderModel
    },
    {
        name: 'userModel',
        model: UserModel
    },
    {
        name: 'chatModel',
        model: ChatModel
    },
    {
        name: 'channelModel',
        model: ChannelModel
    },
    {
        name: 'taskModel',
        model: TaskModel
    },
    {
        name: 'teamModel',
        model: TeamModel
    },
    {
        name: 'postModel',
        model: PostModel
    },
    {
        name: 'fileModel',
        model: FileModel
    },
    {
        name: 'pollModel',
        model: PollModel
    },
    {
        name: 'optionModel',
        model: OptionModel
    },
    {
        name: 'voteModel',
        model: VoteModel
    }

]