const express = require('express');
const router = express.Router();


const  {index,detail} = require('../../controllers/api/userApiController');



//Rutas a Api de Usuarios//
router
.get('/', index)
.get('/:id', detail);


module.exports = router;