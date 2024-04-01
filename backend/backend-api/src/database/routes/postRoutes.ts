import { Router } from "express";
import { PostController } from "../controllers";

const route = Router()

export default (app: Router) => {
    app.use('/posts', route);

    route.get('/getall/:channelId', PostController.getAllPosts);
    route.post('/create', PostController.createPost);
    route.post('/update/:postId', PostController.updatePost);
    route.post('/delete/:postId', PostController.deletePost);
    route.post('/increament/reaction/:postId', PostController.increamentPostReaction);
    route.post('/decreament/reaction/:postId', PostController.decreamentPostReaction);
    route.post('/add/reply/:postId', PostController.addPostReplies);
    route.post('/update/reply/:postId', PostController.updatePostReplies);
    route.post('/delete/reply/:postId', PostController.deletePostReplies);

}
