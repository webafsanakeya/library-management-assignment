import { model, Schema } from "mongoose";

const borrowSchema = new Schema ({
    book: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Borrow = model("Borrow", borrowSchema);