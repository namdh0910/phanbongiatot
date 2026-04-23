const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register', registerUser); // For initial setup, should be secured later

module.exports = router;
