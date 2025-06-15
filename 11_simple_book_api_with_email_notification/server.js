const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json()); //middleware to allow JSON format
app.use(express.urlencoded({ extended: true })); //middleware to allow form encoded data
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Routes
app.use('/', bookRoutes);
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// I separted the applications into different modules for better organization ^-^.
// The server.js file is the entry point of the application. It sets up the Express server and routes.
// The Routes are defined in the bookRoutes.js file at the routes folder, which handles the API endpoints.
// The Controllers are defined in the bookController.js file at the controllers folder, which contains the logic for handling requests and responses.
// The books.js file at the root folder is a JSON file that contains the in-memory book data. (MOngoDB atlas is used for the database)
// The bookSchema.js file at the models folder defines the Mongoose schema for the book data.
// The .env file contains the MongoDB connection string and other environment variables.
