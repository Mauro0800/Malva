const express = require('express');
const router = express.Router();

const {home, dashboardOrders, dashboardProducts, dashboardUsers } = require('../controllers/mainController')

/* / */
router
      .get('/', home)
      .get('/dashboardUsers', dashboardUsers)
      .get('/dashboardProducts', dashboardProducts)
      .get('/dashboardOrders', dashboardOrders)

module.exports = router;
