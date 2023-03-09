const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/category.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const { readJSON, writeJSON} = require('../data');
const { hashSync } = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports ={
   login :  (req,res) =>{
        return res.render('login', {
            categories,
            title: "Ingresá a tu cuenta"
        })
    },
    processLogin : (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){

            const {id, name, category} = readJSON('users.json').find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                name,
                category
            };
            if(req.body.remember){
                res.cookie('usermalva',req.session.userLogin, {maxAge: 1000 * 60 * 1}) //vida de la cookie
            }
            return res.redirect('/')
        }else{
            return res.render('login',{
                title : "Inicio de sesión",
                categories,
                old : req.body,
                errors : errors.mapped()
            })
        }
    },
    
    register :  (req,res) =>{
        return res.render('register', {
            categories,
            title: "Registrá tu cuenta"
        })
    },
    processRegister : (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const users = readJSON('users.json')
            const { name, surname, email, password } = req.body;

            const newUser = {
                id: users.length ? users[users.length -1].id + 1 : 1,
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                password : hashSync(password, 10),
                category : 'user'
            }
            users.push(newUser);

            writeJSON('users.json', users);
            return res.redirect('/login');

        }else{
            
            return res.render('register', {
                title : 'Registro de usuario',
                errors : errors.mapped(),
                old : req.body,
                categories
            })
        }
    },
    profile : (req,res) => {
        return res.render('/profile',{
            title : "Perfil de usuario"
        })
    },

    resetpassword :  (req,res) =>{
        return res.render('resetpassword', {
            categories,
            title: "Restablecer mi contraseña"
        })
    },
    logout: (req,res)=>{
        req.session.destroy();
        return res.redirect('/')
    }
};