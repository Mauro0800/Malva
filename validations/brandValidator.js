const {check} = require('express-validator');

module.exports = [
    check('addBrandInput')
        .notEmpty().withMessage('El nombre de la marca es obligatorio').bail()
        .isLength({min:3, max:12}).withMessage('El nombre de la marca debe tener entre 3 y 12 caracteres'),
]