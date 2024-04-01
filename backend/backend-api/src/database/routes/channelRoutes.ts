import { Router } from "express";
import { ChannelController } from "../controllers";

const route = Router();

export default (app: Router) => {
    app.use('/channel', route);
    
    route.post('/create', ChannelController.createChannel);
    route.post('/update/channelname/:channelId', ChannelController.updateChannelName);
    route.post('/add/admin/:channelId', ChannelController.addChannelAdmin);
    route.post('/remove/admin/:channelId', ChannelController.removeChannelAdmin);
    route.post('/add/member/:channelId', ChannelController.addChannelMember);
    route.post('/remove/member/:channelId', ChannelController.removeChannelMember);
    route.post('/add/tab/:channelId', ChannelController.addChannelTab);
    route.post('/remove/tab/:channelId', ChannelController.removeChannelTab);
    route.post('/delete/:channelId', ChannelController.deleteChannel);

}