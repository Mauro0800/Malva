const express = require('express');
const router = express.Router();

const { login, register, resetpassword } = require('../controllers/usersController')

/* / */
router
    .get('/login', login)
    .get('/register', register)
    .get('/reset-password', resetpassword)


module.exports = router;