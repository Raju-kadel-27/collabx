import { Router } from "express";
import { PollController } from "../controllers";

const route = Router();
console.log('Logging api/routes/v2');

export default (app: Router) => {
    app.use('/polls', route);
    route.get('/get/:channelId', PollController.getPollsByChannelId);
    route.get('/pollstats', PollController.getPollStats)
    route.get('/pollmetadata', PollController.getPollMetadata)
    route.get('/option/metadata', PollController.getOptionMetadata)
    route.post('/create', PollController.createPoll);
    route.post('/cast/vote', PollController.castVote);
    route.post('/post/comments', PollController.postComment);
    route.post('/update/comment', PollController.updateComment);
    route.post('/delete/comment', PollController.deleteComment);
    route.patch('/update', PollController.updatePoll);
    route.delete('/delete', PollController.deletePoll);
    route.post('/add/tag', PollController.addTag )
    route.patch('/remove/tag', PollController.removeTag )
}



