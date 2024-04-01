import { Inject } from 'typedi'
import { TableRepository } from '../Repository/TableRepository';

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


export class TableService {

    constructor(
        @Inject() private tableRepository: TableRepository,
        @Inject('logger') logger: any
    ) { }


    async CreateTable(payload: CreateTable) {
        const { tableName, columns } = payload;
        await this.tableRepository.createTable({
            tableName,
            columns
        })
    };



    async AddColumn(payload: AddColumn) {
        const { tableId, newColumns } = payload;

        await this.tableRepository.addColumn({
            tableId,
            newColumns
        })
    };


    async AddRowData(payload: AddRowData) {
        const { tableId, rowData } = payload;

        await this.tableRepository.addRowData({
            tableId,
            rowData
        })
    };


    async DeleteRowData(payload: DeleteRowData) {
        const { tableId, rowIds } = payload;

        await this.tableRepository.deleteRowData({
            tableId,
            rowIds
        })
    }


    async DeleteColumn(payload: DeleteColumn) {
        const { tableId, columnOrder } = payload;

        await this.tableRepository.deleteColumn({
            tableId,
            columnOrder
        })
    };



}