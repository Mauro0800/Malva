const express = require('express');
const router = express.Router();


const  {index,detail} = require('../../controllers/api/apiUserController');



//Rutas a Api de Usuarios//
router
.get('/users', index)
.get('/users/detail/:id', detail);


module.exports = router;