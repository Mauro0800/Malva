const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min:5, max:50}).withMessage('El nombre del producto debe tener entre 5 y 50 caracteres'),
    check('price')
        .notEmpty().withMessage('El precio del producto es obligatorio').bail()
        .isInt({min:1}).withMessage('Solo números positivos'),
    check('description')
        .notEmpty().withMessage('La descripción del producto es obligatoria').bail()
        .isLength({min:20}).withMessage('La descripción debe tener como minimo 20 caracteres'),
    check('description')
        .notEmpty().withMessage('La descripción del producto es obligatoria').bail()
        .isLength({max:1000}).withMessage('La descripción debe tener entre como maximo 1000 caracteres'),
    check('brand')
        .notEmpty().withMessage('¿Cual es la marca?'),
    check('category')
        .notEmpty().withMessage('¿Cual es la categoria?'),
    check('material')
        .notEmpty().withMessage('¿Cual es el material?')     
]