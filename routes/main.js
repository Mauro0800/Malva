const express = require('express');
const router = express.Router();

const {home, search, dashboardAdmin, dashboardOrders, dashboardUsersDetail, dashboardAdd, dashboardProduct, dashboardBrand, dashboardMaterial, dashboardCategory , dashboardUser, dashboardUserUpdate, dashboardUpdate, dashboardProductDetail, dashboardDelete, dashboardUserDelete} = require('../controllers/mainController');
const { uploadProductImages, uploadUserImage } = require('../middlewares/upload');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const productsValidator = require('../validations/productsValidator');
const brandValidator = require('../validations/brandValidator');
const materialValidator = require('../validations/materialValidator');
const categoryValidator = require('../validations/categoryValidator');
const registerValidator = require('../validations/registerValidator');
const profileValidator = require('../validations/profileValidator');

/* / */
router
.get('/', home)
.get('/search', search)

.get('/dashboard', dashboardAdd)
.get('/dashboardAdmin', dashboardAdmin)
.get('/dashboardOrders', dashboardOrders)

.get('/dashboard/product/:id', dashboardProductDetail)
.post('/dashboard/product', uploadProductImages, productsValidator, dashboardProduct)
.put('/dashboard/product/:id',uploadProductImages,productsValidator, dashboardUpdate)
.delete('/dashboard/product/:id', dashboardDelete)

.get('/dashboardUsers/:id', dashboardUsersDetail)
.post('/dashboardUsers/user', uploadUserImage.single('imageUser'), registerValidator, dashboardUser)
.put('/dashboardUsers/:id',uploadUserImage.single('image'),profileValidator, dashboardUserUpdate)
.delete('/dashboardUsers/:id', dashboardUserDelete)

.post('/dashboard/brand', brandValidator, dashboardBrand)
.post('/dashboard/material', materialValidator, dashboardMaterial)
.post('/dashboard/category', categoryValidator, dashboardCategory)

module.exports = router;
