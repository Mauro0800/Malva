const express = require('express');
const router = express.Router();

const {home, dashboard } = require('../controllers/mainController')

/* / */
router
.get('/', home)

.get('/dashboard', dashboard)


module.exports = router;
