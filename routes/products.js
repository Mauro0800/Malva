const express = require('express');
const router = express.Router();

const checkUseradmin = require('../middlewares/checkUserAdmin');
const { detail, shoppingcart, addproduct, editproduct, store, list,destroy, update, category} = require('../controllers/productController')

/* /products */
router
    .get('/', list)
    .get('/category/:idCategory', category)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/add', addproduct)//checkUseradmin
    .post('/add', store)
    .get('/edit/:id', editproduct)//checkUseradmin
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)//checkUseradmin

module.exports = router;
