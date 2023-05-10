const router = require('express').Router();
const { index, detail, store, update, destroy } = require('../../controllers/api/productApiController');
 
/* /api/products */
 
router
    .get('/', index)
    .get('/:id', detail)
    .post('/', store)
    .put('/:id', update)
    .delete('/:id', destroy)
 
module.exports = router;
