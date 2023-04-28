const router = require('express').Router();
const { index, detail } = require('../../controllers/api/productApiController');

/* /api/products */

router
    .get('/', index)
    .get('/:id', detail)

module.exports = router;
