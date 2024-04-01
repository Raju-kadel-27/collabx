import { Router } from "express";
import { TaskController } from "../controllers";

const route = Router();

export default (app: Router) => {

    app.use('/tasks', route);

    route.get('/getalltasks/:channelId', TaskController.getAllTasks)
    route.post('/create', TaskController.createTask);
    route.post('/update/:taskId', TaskController.updateTask);
    route.post('/delete/:taskId', TaskController.deleteTask);
}
