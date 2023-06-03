const express = require('express');
const router = express.Router();

const {home, search, dashboardAdmin, dashboardOrders, dashboardUsersDetail, dashboardAdd, dashboardProduct, dashboardBrand, dashboardMaterial, dashboardCategory , dashboardUser} = require('../controllers/mainController');
const { uploadProductImages, uploadUserImage } = require('../middlewares/upload');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const productsValidator = require('../validations/productsValidator');
const brandValidator = require('../validations/brandValidator');
const materialValidator = require('../validations/materialValidator');
const categoryValidator = require('../validations/categoryValidator');
const { registerUserValidator } = require('../validations');

/* / */
router
.get('/', home)
.get('/dashboardOrders', dashboardOrders)
.get('/dashboardAdmin', dashboardAdmin)
.get('/dashboardAdd', dashboardAdd)
.get('/dashboardUsers/:id', dashboardUsersDetail)
.post('/dashboardAdd/product', uploadProductImages, productsValidator, dashboardProduct)
.post('/dashboardAdd/user', uploadUserImage.single('image'), registerUserValidator, dashboardUser)
.post('/dashboardAdd/brand', brandValidator, dashboardBrand)
.post('/dashboardAdd/material', materialValidator, dashboardMaterial)
.post('/dashboardAdd/category', categoryValidator, dashboardCategory)

.get('/search', search)

module.exports = router;
