import { Router } from "express";
import { TeamController } from "../controllers";

const route = Router()

export default (app: Router) => {

    app.use('/team', route);

    route.get('/getall', TeamController.getTeamsByUserId);
    route.get('/:teamId/members', TeamController.getAllTeamMembers);
    route.post('/create', TeamController.createTeam);
    route.post('/update/name', TeamController.updateTeamName);
    route.post('/add/member', TeamController.addTeamMember);
    route.post('/remove/member', TeamController.deleteTeamMember);
    route.post('/add/owner', TeamController.addTeamOwner);
    route.post('/remove/owner', TeamController.deleteTeamOwner);
    route.post('/add/channel', TeamController.addTeamChannel);
    route.post('/remove/channel', TeamController.deleteTeamChannel);
    route.post('/delete', TeamController.deleteTeam);

}