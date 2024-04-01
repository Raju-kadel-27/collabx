import { Inject } from "typedi";
import { RowModel, TableModel } from "../models";
import { Model } from "mongoose";
import { ITable } from "../models/Channel-tabs/CustomColumn/Table";

interface CreateTable {
    tableName: string;
    columns: {
        columnName: string;
        order: number
    }[]
}

interface AddColumn {
    tableId: string;
    newColumns: {
        columnName: string;
        order: number
    }[]
}

interface DeleteColumn {
    tableId: string;
    columnOrder: number;
}

interface AddRowData {
    tableId: string;
    rowData: any // rowData is dynamic
}

interface DeleteRowData {
    tableId: string;
    rowIds: string[]
}

export class TableRepository {

    constructor(
        @Inject('tableModel') private tableModel: Model<ITable>,
        @Inject('rowModel') private rowModel: Model<any>,
    ) { }



    async createTable({ tableName, columns }: CreateTable) {

        return await this.tableModel.create({
            name: tableName,
            columns
        })

    }


    async addColumn({ tableId, newColumns }: AddColumn) {

        return await this.tableModel.findByIdAndUpdate(
            tableId,
            { $push: { columns: { $each: newColumns } } }
        )

    }

    async deleteColumn({ tableId, columnOrder }: DeleteColumn) {

        return await this.tableModel.findByIdAndUpdate(
            tableId,
            { $pull: { columns: { order: { $in: columnOrder } } } }
        )

    }

    async addRowData({ tableId, rowData, }: AddRowData) {
        const newRow = await this.rowModel.create({ ...rowData });

        return await this.tableModel.findByIdAndUpdate(
            tableId,
            { $push: { rows: newRow._id } }
        )
    }

    async deleteRowData({ tableId, rowIds }: DeleteRowData) {

        const [res1, res2] = await Promise.all([
            await this.rowModel.deleteMany({ _id: { $in: rowIds } }),

            await this.tableModel.findByIdAndUpdate(
                tableId,
                { $pull: { rows: { $in: rowIds } } },
                { new: true }
            )
        ])

        return res2;
    }
}