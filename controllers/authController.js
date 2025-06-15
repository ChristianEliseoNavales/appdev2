const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userSchema');

const signup = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password } = req.body;

  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ error: "Username is already taken!" });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ error: "Email is already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const signin = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6).required()
  }).or('username', 'email'); 

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { username: username || '' },
        { email: email || '' }
      ]
    });
    if (!user) return res.status(400).json({ error: 'User not found with the username or email you provided' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { signup, signin };
