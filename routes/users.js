const express = require('express');
const router = express.Router();


const { login, register, resetpassword, processRegister, processLogin, logout, profile } = require('../controllers/usersController')
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator,loginUserValidator} = require('../validations')


/* /users */
router
    .get('/users/login',checkUser, login)
    .post('/users/login',loginUserValidator ,processLogin)
    .get('/users/register',checkUser, register)
    .post('/users/register', registerUserValidator, processRegister)
    .get('/users/reset-password', resetpassword)
    .get('/users/logout', logout)
    .get('/users/profile',checkUserLogin, profile)


module.exports = router;