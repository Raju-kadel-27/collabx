import { Router } from "express";
import { UserController } from "../controllers";

const route = Router()

export default (app: Router) => {
    app.use('/user', route);
    route.post('/search', UserController.searchUser);

}


