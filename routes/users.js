const express = require('express');
const router = express.Router();


const { login, register, resetpassword, processRegister, processLogin, logout, profile } = require('../controllers/usersController')
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator,loginUserValidator } = require('../validations')


/* / */
router
    .get('/login',checkUser, login)
    .post('/login',loginUserValidator ,processLogin)
    .get('/register',checkUser, register)
    .post('/register', registerUserValidator, processRegister)
    .get('/reset-password', resetpassword)
    .get('/logout', logout)
    .get('/userProfile',checkUserLogin, profile)


module.exports = router;