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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = __importDefault(require("../models/books.model"));
exports.borrowRoutes = express_1.default.Router();
// POST /borrow — Create a new borrow record
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity } = req.body;
        const borrowedBook = yield books_model_1.default.findById(book);
        if (!borrowedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        if (quantity > borrowedBook.copies) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
            });
            return;
        }
        const updatedBook = yield books_model_1.default.findOneAndUpdate({ _id: book }, { $inc: { copies: -quantity } }, { new: true });
        if (updatedBook) {
            updatedBook.updateAvailable();
            yield updatedBook.save();
        }
        const borrow = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
}));
// GET /borrow — Summary of borrowed books
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowSummary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book',
                },
            },
            { $unwind: '$book' },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn',
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrowSummary,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
}));
