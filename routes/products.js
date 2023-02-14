const express = require('express');
const router = express.Router();

const { productdetail,  shoppingcart,  addproduct,editproduct, store, index } = require('../controllers/productController')

/* /products */
router

.get('/', index)
.get('/product-detail', productdetail)
.get('/shopping-cart', shoppingcart)
.get('/add-product', addproduct)
.post('/add-product', store)
.get('/edit-product', editproduct)

module.exports = router;
