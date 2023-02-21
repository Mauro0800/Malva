const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const { detail, shoppingcart, addproduct, editproduct, store, index,destroy, update} = require('../controllers/productController')

/* /products */
router
    .get('/', index)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/add-product', addproduct)
    .post('/add-product', store)
    .get('/edit/:id', editproduct)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)

module.exports = router;
