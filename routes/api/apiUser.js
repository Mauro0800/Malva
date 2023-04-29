const express = require('express');
const router = express.Router();


const  {index,detail} = require('../../controllers/api/apiUserController');



//Rutas a Api de Usuarios//
router
.get('/', index)
.get('/:id', detail);


module.exports = router;