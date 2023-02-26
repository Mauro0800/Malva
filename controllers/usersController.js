const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/category.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

module.exports ={
   login :  (req,res) =>{
        return res.render('login', {
            categories,
            title: "Ingresá a tu cuenta"
        })
    },
    register :  (req,res) =>{
        return res.render('register', {
            categories,
            title: "Registrá tu cuenta"
        })
    },
    resetpassword :  (req,res) =>{
        return res.render('resetpassword', {
            categories,
            title: "Restablecer mi contraseña"
        })
    }
};