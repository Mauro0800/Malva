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
    .get('/add',checkUserAdmin, addproduct)//checkUseradmin
    .post('/add',uploadProductImages,productValidator, store)
    .get('/edit/:id',checkUserAdmin, editproduct)//checkUseradmin
    .put('/update/:id',uploadProductImages,productValidator, update)
    .delete('/delete/:id',checkUserAdmin, destroy)//checkUseradmin
 
module.exports = router;
