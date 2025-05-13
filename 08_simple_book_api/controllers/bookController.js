const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../books.json');

// Read books from books.json file
const readBooks = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Write books to books.json file
const writeBooks = (books) => {
  fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8', (err) => {
    if (err) throw err;
  });
};

// Welcome message
const welcome = (req, res) => {
  res.send("Simple Book API using Node.js and Express");
};

// GET /api/books
const getAllBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

// GET /api/books/:id
const getBookById = (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.json(book);
};

// POST /api/books
const addBook = (req, res) => {
  const { title, author } = req.body;
  const books = readBooks();

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
};

// PATCH /api/books/:id
const updateBook = (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  if (req.body.title) book.title = req.body.title;
  if (req.body.author) book.author = req.body.author;

  writeBooks(books);
  res.json(book);
};

// DELETE /api/books/:id
const deleteBook = (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(index, 1);
  writeBooks(books);
  res.send(`Book ID ${id} has been deleted`);
};

module.exports = {
  welcome,
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
