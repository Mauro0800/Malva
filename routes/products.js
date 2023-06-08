const express = require('express');
const router = express.Router();

const { detail, shoppingcart, addproduct, editproduct, store, list,destroy, update, category} = require('../controllers/productController')
const {uploadProductImages} = require('../middlewares/upload')
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const productValidator = require('../validations/productsValidator')

/* /products */
router
    .get('/', list)
    .get('/category/:idCategory', category)
    .get('/detail/:id', detail)
    .get('/shopping-cart', shoppingcart)
    .get('/edit/:id', editproduct)
    .put('/update/:id',uploadProductImages,productValidator, update)
    .delete('/delete/:id', destroy)
 
module.exports = router;
