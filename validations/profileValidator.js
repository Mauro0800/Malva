const { check, body } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Debes colocar tu nombre').bail()
        .isLength({
            min: 3
        }).withMessage('Tu nombre debe contener al menos 3 letras').bail()
        .isAlpha('es-ES' , {
            ignore : " "
        }).withMessage('Solo caracteres alfabéticos'),
    
    check('surname')
        .notEmpty().withMessage('Debes colocar tu apellido').bail()
        .isLength({
            min: 3
        }).withMessage('Tu nombre debe contener al menos 3 letras').bail()
        .isAlpha('es-ES', {
            ignore : " "
        }).withMessage('Solo caracteres alfabéticos')

]