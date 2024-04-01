import { Router } from "express";
import { AnnouncementController } from "../controllers";

const route = Router()

export default (app: Router) => {
    app.use('/announcement', route);

    route.get('/getall/:announcementId', AnnouncementController.getAllAnnouncements)
    route.post('/create', AnnouncementController.createAnnouncements);
    route.post('/update', AnnouncementController.updateAnnouncements);
    route.post('/delete/:announcementId', AnnouncementController.deleteAnnouncements);
}
