const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const connectDB = require('../config/db'); 
const User = require('../models/userSchema');
const Book = require('../models/bookSchema');

const seedData = async () => {
  try {
    await connectDB(); 

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log("🧹 Cleared existing users and books");

    const users = [];
    for (let i = 0; i < 5; i++) {
      const password = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password,
      });
      await user.save();
      users.push(user);
    }
    console.log("✅ Seeded 5 users");

    for (let i = 0; i < 10; i++) {
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 30 }).getFullYear(),
        user: users[Math.floor(Math.random() * users.length)]._id,
      });
      await book.save();
    }
    console.log("✅ Seeded 10 books");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedData();
