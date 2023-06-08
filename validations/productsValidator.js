const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min:3, max:20}).withMessage('El nombre del producto debe tener entre 3 y 12 caracteres'),
        check('brand')
        .notEmpty().withMessage('El nombre de la marca es obligatorio').bail(),
    check('material')
        .notEmpty().withMessage('El nombre del material es obligatorio').bail(),
    check('category')
        .notEmpty().withMessage('El nombre de la categoria es obligatorio').bail(),
    check('price')
        .notEmpty().withMessage('El precio del producto es obligatorio').bail()
        .isInt({min:1}).withMessage('Solo números mayores a 0'),
    check('description')
        .notEmpty().withMessage('La descripción del producto es obligatoria').bail()
        .isLength({min:20, max:1000}).withMessage('La descripción debe tener como minimo 20 caracteres'),
    check('brand')
        .notEmpty().withMessage('¿Cual es la marca?'),
    check('category')
        .notEmpty().withMessage('¿Cual es la categoria?'),
    check('material')
        .notEmpty().withMessage('¿Cual es el material?')     
]