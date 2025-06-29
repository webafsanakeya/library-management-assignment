import { Date, Document, Types } from "mongoose";

export interface IBorrow extends Document {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date,
    createdAt?: Date,
    updatedAt?: Date
}