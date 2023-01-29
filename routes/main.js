const express = require('express');
const router = express.Router();

const {home, login, register, productdetail, resetpassword, shoppingcart, dashboard } = require('../controllers/mainController')

/* / */
router
.get('/', home)
.get('/login',login)
.get('/register', register)
.get('/productdetail', productdetail)
.get('/resetpassword', resetpassword)
.get('/shoppingcart', shoppingcart)
.get('/dashboard', dashboard)

module.exports = router;
