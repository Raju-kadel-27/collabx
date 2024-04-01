import mongoose, { Document, Mongoose } from "mongoose";

export interface ITable extends Document {
    name: string;
    columns: { columnName: string; order: string; };
    rows: string[];
}

const TableSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    columns: [
        {
            columnName: String,
            order: Number
        },
    ],

    rows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Row'
        }
    ],

});

const TableModel = mongoose.model<ITable>('Table', TableSchema);

export default TableModel;