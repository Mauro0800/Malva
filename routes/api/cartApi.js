const router = require('express').Router();
const {getOrderPending} = require('../../controllers/api/cartApiController');
const {index, detail} = require('../../controllers/api/productApiController');

/* /api/cart */

router
    .get('/getOrderPending', getOrderPending)
    .post('/addProduct', addProduct)
    .delete('/removeProduct', removeProduct)
    .put('/moreQuantity', moreQuantity)
    .put('/lessQuantity', lessQuantity)
    .delete('/clearCart', clearCart)
    .put('/statusOrder', statusOrder)


module.exports = router;