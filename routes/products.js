const express = require('express');
const router = express.Router();

const checkUseradmin = require('../middlewares/checkUserAdmin');
const { detail, shoppingcart, addproduct, editproduct, store, index,destroy, update, category} = require('../controllers/productController')

/* /products */
router
    .get('/', list)
    .get('/category/:idCategory', category)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/add',checkUseradmin, addproduct)
    .post('/add-product', store)
    .get('/edit/:id',checkUseradmin, editproduct)
    .put('/update/:id', update)
    .delete('/delete/:id',checkUseradmin, destroy)

module.exports = router;
