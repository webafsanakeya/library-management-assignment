"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = __importDefault(require("../models/books.model"));
exports.booksRoutes = express_1.default.Router();
// post a book
exports.booksRoutes.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.default.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created Successfully',
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
}));
// get all books
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const queryFilter = {};
        if (filter)
            queryFilter.genre = filter;
        let query = books_model_1.default.find(queryFilter);
        if (sortBy && sort) {
            const sortField = sortBy;
            const sortOrder = sort === "asc" ? 1 : -1;
            query = query.sort({ [sortField]: sortOrder });
        }
        if (limit) {
            query = query.limit(Number(limit));
        }
        const books = yield query;
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
}));
// get book by id
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield books_model_1.default.findOne({ _id: new Object(id) });
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
}));
// update book by id
exports.booksRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updatedDoc = req.body;
        const book = yield books_model_1.default.findByIdAndUpdate(id, updatedDoc, { new: true });
        res.status(200).json({
            success: true,
            message: 'Book updated Successfully',
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
}));
// delete book by id
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield books_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        });
    }
}));
