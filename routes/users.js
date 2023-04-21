const express = require('express');
const router = express.Router();

const { login, register, resetpassword, processRegister, processLogin,update,  logout, profile, destroy } = require('../controllers/usersController')
const {storageUserImage, uploadUserImage} = require('../middlewares/upload');
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator,loginUserValidator} = require('../validations')


/* /users */
router
    .get('/login',checkUser, login) //borre middleware de checkUser
    .post('/login',loginUserValidator ,processLogin)
    .get('/register',checkUser, register) //borre middleware de checkUser
    .post('/register',registerUserValidator, processRegister) //borre middleware de registerUserValidator
    .get('/profile',checkUserLogin, profile) 
    .put('/update', update)
    .get('/reset-password', resetpassword)
    .get('/logout', logout)
    .delete('/delete', destroy)


module.exports = router;