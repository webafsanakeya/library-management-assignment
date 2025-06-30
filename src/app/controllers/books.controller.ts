
import express, { Request, Response } from 'express';
import Book from '../models/books.model';


export const booksRoutes = express.Router()
// post a book
booksRoutes.post('/create-book', async (req: Request, res: Response) => {
 try{
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created Successfully',
            data: book
        });
    }catch (error: any){
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });

    }
});

// get all books
booksRoutes.get('/', async(req: Request, res: Response) =>{
    try{
       const {filter, sortBy, sort, limit} = req.query;

       const queryFilter: any ={};
       if(filter) queryFilter.genre = filter;
       let query = Book.find(queryFilter);

       if (sortBy && sort) {
       const sortField = sortBy as string;
       const sortOrder = sort === "asc" ? 1 : -1;
       query = query.sort({ [sortField]: sortOrder }); 
    }
        if(limit) {
        query = query.limit(Number(limit))
    }
const books = await query;
res.status(200).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books
});

    }catch(error: any){
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
});

// get book by id
booksRoutes.get('/:bookId', async (req: Request, res: Response) =>{
    try{
        const id =  req.params.bookId;
        const book = await Book.findOne({_id: new Object(id)});
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }catch(error: any){
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
});

// update book by id
booksRoutes.patch('/:bookId', async(req: Request, res: Response) =>{
    try{
        const id =  req.params.bookId;
        const updatedDoc = req.body;
        const book = await Book.findByIdAndUpdate(id, updatedDoc, {new: true});
        res.status(200).json({
            success: true,
            message: 'Book updated Successfully',
            data: book
        });
    }catch(error: any){
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
});

// delete book by id
booksRoutes.delete('/:bookId', async(req: Request, res: Response) =>{
    try{
        const id =  req.params.bookId;
        await Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }catch(error: any){
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
});

