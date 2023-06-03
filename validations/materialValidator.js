const {check} = require('express-validator');

module.exports = [
    check('addMaterialInput')
        .notEmpty().withMessage('El nombre del material es obligatorio').bail()
        .isLength({min:3, max:12}).withMessage('El nombre del material debe tener entre 3 y 12 caracteres'),
]