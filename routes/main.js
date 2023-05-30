const express = require('express');
const router = express.Router();

const {home, search, dashboardAdmin, dashboardOrders, dashboardUsersDetail, dashboardAdd, dashboardProduct, dashboardBrand, dashboardMaterial, dashboardCategory} = require('../controllers/mainController');
const { uploadProductImages } = require('../middlewares/upload');
const productsValidator = require('../validations/productsValidator');

/* / */
router
.get('/', home)
.get('/dashboardOrders', dashboardOrders)
.get('/dashboardAdmin', dashboardAdmin)
.get('/dashboardAdd', dashboardAdd)
.get('/dashboardUsers/:id', dashboardUsersDetail)
.post('/dashboardAdd/product', uploadProductImages, productsValidator, dashboardProduct)
.post('/dashboardAdd/brand', dashboardBrand)
.post('/dashboardAdd/material', dashboardMaterial)
.post('/dashboardAdd/category', dashboardCategory)

.get('/search', search)

module.exports = router;
