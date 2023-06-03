const express = require('express');
const router = express.Router();

const { login, register, resetpassword, processRegister, processLogin,update,  logout, profile, destroy } = require('../controllers/usersController')
const {uploadUserImage} = require('../middlewares/upload');
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator,loginUserValidator,profileValidator} = require('../validations')


/* /users */
router
    .get('/login',checkUser, login)
    .post('/login',loginUserValidator ,processLogin)
    .get('/register',checkUser, register)
    .post('/register',uploadUserImage.single('image'),registerUserValidator, processRegister)
    .get('/profile',checkUserLogin, profile) 
    .put('/update',uploadUserImage.single('image'),profileValidator, update)
    .get('/reset-password', resetpassword)
    .get('/logout', logout)
    .delete('/delete', destroy)


module.exports = router;