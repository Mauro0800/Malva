const fs = require('fs');
const path = require('path');
const { hashSync } = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = {

    login: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                return res.render('users/login', {
                    categories,
                    title: "Ingresá a tu cuenta"
                })
            })
    },

    processLogin: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(({ id, name, rolId }) => {

                    req.session.userLogin = {
                        id,
                        name,
                        rol: rolId
                    };

                    if (req.body.remember) {
                        res.cookie('usermalva', req.session.userLogin, { maxAge: 1000 * 60 }) //vida de la cookie
                    }
                    return res.redirect('/')
                })
                .catch(error => console.log(error))
        } else {

            db.Category.findAll()
                .then(categories => {

                    return res.render('users/login', {
                        title: "Inicio de sesión",
                        categories,
                        old: req.body,
                        errors: errors.mapped()
                    })
                })

        }
    },

    register: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                return res.render('users/register', {
                    categories,
                    title: "Crea tu cuenta"
                })
            })
    },
    processRegister: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const { name, surname, email, password } = req.body;

            db.Address.create()
                .then(address => {
                    db.User.create({
                        name: name.trim(),
                        surname: surname.trim(),
                        email: email.trim(),
                        password: hashSync(password, 12),
                        image: 'default-image.jpg',
                        rolId: 2,
                        addressId: address.id
                    })
                        .then(({ id, name, rolId }) => {

                            req.session.userLogin = {
                                id,
                                name,
                                rol: rolId
                            };
                            return res.redirect('/');
                        })

                }).catch(error => console.log(error))
        } else {
            db.Category.findAll()
                .then(categories => {

                    return res.render('users/register', {
                        categories,
                        title: "Registro de usuario",
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
        }
    },
    profile: (req, res) => {

        const user = db.User.findByPk(req.session.userLogin.id, {
            attributes: ['name', 'surname', 'email', 'image'],
            include: [
                {
                    association: 'address',
                    attributes: ['address', 'city', 'province', 'zipCode']
                }
            ],
        })
        
           .then(user => {
                return res.render('users/profile', {                   
                    title: "Perfil de usuario",
                    user,
                })
            }).catch(error => console.log(error))
    },

    update: (req, res) => {
        
        const errors = validationResult(req);

        if(!req.session.userLogin){
            return res.redirect('/users/profile') 
        }
        const { name, surname, address, city, province, zipCode } = req.body
        const { id } = req.session.userLogin;

        if (req.fileValidationError) {
            errors.errors.push({
                value: "",
                msg: req.fileValidationError,
                param: "image",
                location: "files",
            });
        }
    
        if(errors.isEmpty()) {
        db.User.findByPk(id)
            .then(user => {

                const addressUpdated = db.Address.update(
                    {
                        address: address ? address.trim() : null,
                        city: city ? city.trim() : null,
                        province: province ? province.trim() : null,
                        zipCode: zipCode ? zipCode : null
                    },
                    {
                        where: {
                            id: user.addressId
                        }
                    }
                )
                const userUpdated = db.User.update(
                    {
                        name: name.trim(),
                        surname: surname.trim(),
                        image: req.file ? req.file.filename : user.image
                    },
                    {
                        where: {
                            id
                        }
                    }
                )
                Promise.all(([addressUpdated, userUpdated]))
                    .then(() => {
                        (req.file && fs.existsSync('./public/images/users/' + user.image)) && fs.unlinkSync('./public/images/users/' + user.image)
                        req.session.message = "Datos actualizados"
                        // return res.send([user,req.file])
                        return res.redirect('/users/profile')
                    })
            }).catch(error => console.log(error))
        }else{

            (req.file && fs.existsSync('./public/images/users/' + req.file.filename)) && fs.unlinkSync('./public/images/users/' + req.file.filename)

            const user = db.User.findByPk(req.session.userLogin.id, {
                attributes: ['name', 'surname', 'email', 'image'],
                include: [
                    {
                        association: 'address',
                        attributes: ['address', 'city', 'province', 'zipCode']
                    }
                ],
            })
            
            .then(user => {
                return res.render('users/profile', {                  
                    errors: errors.mapped(),
                    old: req.body,
                    title : "Perfil de usuario",
                    user,
                 })
             }).catch(error => console.log(error))
            
        }
    },

    resetpassword: (req, res) => {
        return res.render('users/resetpassword', {
            categories,
            title: "Restablecer mi contraseña"
        })
    },
    logout: (req, res) => {
        req.session.destroy()
        res.clearCookie('usermalva');
        return res.redirect('/')
    },
    destroy: (req, res) => {

        const { id } = req.session.userLogin;

        db.User.findByPk(id)
            .then((user) => {
                req.session.destroy()

                db.User.destroy({
                    where: { id }
                }).then(() => {
                    return res.redirect('/')
                })
            })
            .catch(error => console.log(error))
    }
};