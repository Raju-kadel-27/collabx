import { CardIconType } from "../CardIcons/CardIconType";

export const CardInfo = [
    {
        title: 'Streaming setup',
        description: "Want to stream your video chat session directly to platform like facebook, youtube and twitch ?.",
        divColor: 'bg-slate-50',
        iconSize: '36',
        iconColor: '#D1D5DB',
        route: '/youtube-streaming',
        type: CardIconType.STREAM_SETTING
    },
    {
        title: 'Chats',
        description: 'Start connecting to your friends & relatives through text messages and video calls.',
        divColor: '#EDE9FE',
        iconSize: '32',
        iconColor: '#DB2777',
        route: '/chats',
        type: CardIconType.CHAT
    },
    {
        title: 'Create Classroom',
        description: 'Conduct online classes with your students. Enjoy recordings, chats and file sharing',
        divColor: 'bg-slate-50',
        iconSize: '36',
        iconColor: 'green',
        route: '/create-classroom',
        type: CardIconType.CLASSROOM
    },
    {
        title: 'Conduct Interviews',
        description: 'Easy interview experience with code editor, code execution & output, live audio and video.',
        divColor: '#FEE2E2',
        iconSize: '36',
        iconColor: 'red',
        route: '/conduct-interviews',
        type: CardIconType.INTERVIEW
    },
    {
        title: 'Docs Editor',
        description: 'Invite people to live collaboration to edit your documents with possibility of live audio/video feature.',
        divColor: '#DBEAFE',
        iconSize: '36',
        iconColor: 'blue',
        route: '/docs-editor',
        type: CardIconType.DOCS
    },

    {
        title: 'Podcasts',
        description: 'Podcast among your loved ones and share some valuable ideas & knowledge to them.',
        divColor: '#FFEDD5',
        iconSize: '36',
        iconColor: 'orange',
        route: '/podcasts',
        type: CardIconType.PODCAST
    },

]