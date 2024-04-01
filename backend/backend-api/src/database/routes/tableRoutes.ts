import { Router } from "express";
import { TableController } from "../controllers";

const route = Router();

export default (app: Router) => {

    app.use('/table', route);

    route.get('/createtable', TableController.createTable);
    route.post('/addcolumn', TableController.addColumn);
    route.post('/addrowdata', TableController.addRowData);
    route.post('/deletecolumn', TableController.deleteColumn);
    route.post('/deleterowdata', TableController.deleteRowData);
}
