import { model, Schema } from "mongoose";
import { BookDocument } from "../interfaces/books.interface";

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, 
      required: true, 
      trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: { type: String, 
      required: true, 
      unique: true, 
      trim: true },
    description: { 
      type: String, 
      trim: true },
    copies: { 
      type: Number, 
      required: true },
    available: { 
      type: Boolean, 
      default: true, 
      required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


bookSchema.methods.updateAvailable = function () {
  this.available = this.copies > 0;
};

bookSchema.pre('save', function(){
    console.log('Middle ware worked before saving the book ');
});

bookSchema.post('save', function(doc){
    console.log('Middle ware worked after saving the book and doc is: ', doc);
});

const Book = model<BookDocument>("Book", bookSchema);
export default Book;
