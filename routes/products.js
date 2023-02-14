const express = require('express');
const router = express.Router();

const { productdetail,  shoppingcart,  addproduct,editproduct, store } = require('../controllers/productController')

/* / */
router

.get('/product-detail', productdetail)
.get('/shopping-cart', shoppingcart)
.get('/add-product', addproduct)
.post('/add-product', store)
.get('/edit-product', editproduct)

module.exports = router;
