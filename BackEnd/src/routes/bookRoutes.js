import express from 'express';
import { createBook, updateBook, deleteBook, reserveBook, getBooks, getBookById } from '../controllers/BookController.js';

const router = express.Router();

router.post('/books/createBook', createBook);
router.put('/books/updateBook/:id', updateBook);
router.delete('/books/deleteBook/:id', deleteBook);
router.post('/books/:id/reserve', reserveBook);
router.get('/books/',getBooks );
router.get('/books/:id',getBookById );

export default router;
