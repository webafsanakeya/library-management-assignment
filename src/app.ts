import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

dotenv.config();

const app: Application = express();

// middleware
app.use(express.json());

// routes
app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management");
});
export default app;
