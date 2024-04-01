import { Router } from "express";
import { DeltaController } from "../controllers";

const route = Router()

export default (app: Router) => {

    app.use('/delta', route);

    route.get('/setupdeltaholder', DeltaController.SetupDeltaHolder);
    route.get('/add', DeltaController.AddDelta);
    route.get('/update', DeltaController.UpdateDelta)
    route.get('/addcontributors', DeltaController.AddContributors)
    route.get('/removecontributors', DeltaController.RemoveContributors)

}