import Container from "typedi";
import { Request, Response, NextFunction } from 'express'
import { TableService } from "../services";


export const createTable =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tableService = Container.get(TableService);

            const { newTable }:any = await tableService.CreateTable(req.body);

            res.status(200).json(newTable);

        } catch (error) {
            next(error)
        }
    }



export const addColumn =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tableService = Container.get(TableService);

            await tableService.AddColumn(req.body);

            res.status(200).json({ message: 'success' });

        } catch (error) {
            next(error)
        }
    }


export const deleteColumn =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tableService = Container.get(TableService);

            await tableService.DeleteColumn(req.body);

            res.status(200).json({ message: 'success' });

        } catch (error) {
            next(error)
        }
    }



export const addRowData =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tableService = Container.get(TableService);

            await tableService.AddRowData(req.body);

            res.status(200).json({ message: 'success' });

        } catch (error) {
            next(error)
        }
    }



export const deleteRowData =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const tableService = Container.get(TableService);

            await tableService.DeleteRowData(req.body);

            res.status(200).json({ message: 'success' });

        } catch (error) {
            next(error)
        }
    }
