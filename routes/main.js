const express = require('express');
const router = express.Router();

const {home, login, register, productdetail, resetpassword, shoppingcart, dashboard, addproduct,editproduct,list } = require('../controllers/mainController')

/* / */
router
.get('/', home)
.get('/login',login)
.get('/register', register)
.get('/reset-password', resetpassword)
.get('/product-detail', productdetail)
.get('/shopping-cart', shoppingcart)
.get('/dashboard', dashboard)
.get('/add-product', addproduct)
.get('/edit-product', editproduct)
.get('/list', list)

module.exports = router;
