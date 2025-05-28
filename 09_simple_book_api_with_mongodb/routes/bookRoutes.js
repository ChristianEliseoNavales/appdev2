const express = require('express');
const router = express.Router();
const {welcome,getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/bookController');

router.get('/', welcome);
router.get('/api/books', getAllBooks); 
router.get('/api/books/:id', getBookById);
router.post('/api/books', addBook);
router.patch('/api/books/:id', updateBook);
router.delete('/api/books/:id', deleteBook);

module.exports = router;
