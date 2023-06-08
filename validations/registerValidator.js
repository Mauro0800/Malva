const { check, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('nameUser')
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
        }).withMessage('Solo caracteres alfabéticos'),

    body('email')
        .notEmpty().withMessage('Debes colocar tu email').bail()
        .isEmail().withMessage('El email debe contener un formato válido')
        .custom((value, {req}) => {
            return db.User.findOne({
                where: {
                    email: value
                }
            }).then(user => {
                if(user){
                    return Promise.reject()
                }
            }).catch((error) => {
                console.log(error)
                return Promise.reject('El email ya se encuentra registrado')
            })
        }),

    check('password')
        .notEmpty().withMessage('Debes colocar tu contraseña').bail()
        .isLength({
            min: 8,
            max: 25
        }).withMessage('La contraseña debe tener minimo 8 caracteres'),
    
    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden'),
]