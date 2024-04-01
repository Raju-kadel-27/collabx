import { Router } from "express";
import { AuthController } from "../controllers";
import { CelebrateMiddleware } from "../../lib/middlewares/celebrate";
import { signInSchema } from "../../validators/auth/signIn";
import { signUpSchema } from "../../validators/auth/registration";

const route = Router()

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/register', CelebrateMiddleware(signUpSchema), AuthController.SignUp);
    route.post('/login', CelebrateMiddleware(signInSchema), AuthController.SignIn);
    route.get('/refresh', AuthController.Refresh);
    route.post('/logout', AuthController.LogOut);
}
