const express = require('express');
const router = express.Router();

const {home, dashboard, search, addMoreProducts } = require('../controllers/mainController')

/* / */
router
.get('/', home)

.get('/dashboard', dashboard)

.get('/search', search)

module.exports = router;
