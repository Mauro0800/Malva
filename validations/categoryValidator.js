const {check} = require('express-validator');

module.exports = [
    check('addCategoryInput')
        .notEmpty().withMessage('El nombre de la categoria es obligatorio').bail()
        .isLength({min:3, max:12}).withMessage('El nombre de la categoria debe tener entre 3 y 12 caracteres'),
]