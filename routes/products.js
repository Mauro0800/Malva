const express = require('express');
const router = express.Router();

const checkUseradmin = require('../middlewares/checkUserAdmin');
const { detail, shoppingcart, addproduct, editproduct, store, list,destroy, update, category} = require('../controllers/productController')
const {uploadProductImages} = require('../middlewares/upload')
const productValidator = require('../validations/productsValidator')

/* /products */
router
    .get('/', list)
    .get('/category/:idCategory', category)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/add',checkUseradmin, addproduct)//checkUseradmin
    .post('/add',uploadProductImages,productValidator, store)
    .get('/edit/:id',checkUseradmin, editproduct)//checkUseradmin
    .put('/update/:id',uploadProductImages,productValidator, update)
    .delete('/delete/:id',checkUseradmin, destroy)//checkUseradmin

module.exports = router;
