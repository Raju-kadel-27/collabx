import { Router } from 'express';
import authRoutes from './authRoutes';
import chatRoutes from './chatRoutes';
import messageRoutes from './messageRoutes';
import teamRoutes from './teamRoutes';
import channelRoutes from './channelRoutes';
import taskRoutes from './taskRoutes';
import postRoutes from './postRoutes';
import fileRoutes from './fileManagerRoutes';
import announcementRoutes from './announcementRoutes';
import pollRoutes from './pollRoutes';
// import tableRoutes from './tableRoutes';
// import deltaRoutes from './deltaRoutes';
// import userRoutes from './userRoutes';

export default () => {
    const app = Router();

    authRoutes(app);
    chatRoutes(app);
    messageRoutes(app);
    teamRoutes(app);
    postRoutes(app);
    fileRoutes(app);
    channelRoutes(app);
    taskRoutes(app);
    announcementRoutes(app);
    pollRoutes(app);
    // tableRoutes(app);
    // deltaRoutes(app);
    // userRoutes(app);

    return app;
}