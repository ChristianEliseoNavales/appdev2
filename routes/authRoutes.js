const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');

router.post('/api/auth/signup', signup);
router.post('/api/auth/signin', signin);

module.exports = router;
