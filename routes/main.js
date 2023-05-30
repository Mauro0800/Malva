const express = require('express');
const router = express.Router();

const {home, search, dashboardProducts, dashboardUsers,dashboardOrders } = require('../controllers/mainController')

/* / */
router
.get('/', home)
.get('/dashboardUsers', dashboardUsers)
.get('/dashboardProducts', dashboardProducts)
.get('/dashboardOrders', dashboardOrders)

.get('/search', search)

module.exports = router;
