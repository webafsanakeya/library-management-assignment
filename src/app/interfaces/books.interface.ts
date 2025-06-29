import { Document } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Custom method
export interface BookDocument extends IBook, Document {
  updateAvailable(): void;
}
