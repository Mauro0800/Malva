const express = require('express');
const router = express.Router();

const { detail, shoppingcart, addproduct, editproduct, store, index,destroy, update, category} = require('../controllers/productController')

/* /products */
router
    .get('/', index)
    .get('/category/:idCategory', category)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/add', addproduct)
    .post('/add-product', store)
    .get('/edit/:id', editproduct)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)

module.exports = router;
