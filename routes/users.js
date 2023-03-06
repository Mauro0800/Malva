const express = require('express');
const router = express.Router();

const { login, register, resetpassword, processRegister, processLogin } = require('../controllers/usersController')
const { registerUserValidator,loginUserValidator } = require('../validations')

/* / */
router
    .get('/login', login)
    .post('/login',loginUserValidator ,processLogin)
    .get('/register', register)
    .post('/register', registerUserValidator, processRegister)
    .get('/reset-password', resetpassword)


module.exports = router;