const express = require('express');
const router = express.Router();
const  {index,detail,register,update, destroy} = require('../../controllers/api/userApiController');
const { registerUserValidator} = require('../../validations')

//  /api/users

router
.get('/', index)
.get('/:id', detail)
.post('/',registerUserValidator, register)
.put('/:id', update)
.delete('/:id', destroy)


module.exports = router;