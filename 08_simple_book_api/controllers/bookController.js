const Book = require('../models/bookSchema');

// Welcome message
const welcome = (req, res) => {
  res.send("Simple Book API using Node.js, Express, and MongoDB");
};

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (err) {
    res.status(400).send("Invalid ID format");
  }
};

// POST /api/books
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).send("Failed to add book");
  }
};

// PATCH /api/books/:id
const updateBook = async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (err) {
    res.status(400).send("Invalid ID or update data");
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.send(`Book ID ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(400).send("Invalid ID format");
  }
};

module.exports = {
  welcome,
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
