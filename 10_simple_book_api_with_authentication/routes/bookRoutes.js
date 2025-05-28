const express = require('express');
const router = express.Router();
const {welcome,getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', welcome);
router.get('/api/books', authenticateToken, getAllBooks);
router.get('/api/books/:id', authenticateToken, getBookById);
router.post('/api/books', authenticateToken, addBook);
router.patch('/api/books/:id', authenticateToken, updateBook);
router.delete('/api/books/:id', authenticateToken, deleteBook);

module.exports = router;
