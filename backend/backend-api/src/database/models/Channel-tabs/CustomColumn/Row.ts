import mongoose, { Document, Mongoose } from "mongoose";

const RowSchema = new mongoose.Schema({}, { strict: false });

const RowModel = mongoose.model<any>('Row', RowSchema);

export default RowModel;