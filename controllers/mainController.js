const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categoriesFilePath = path.join(__dirname, '../data/category.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports ={
    home : (req,res) =>{
        return res.render('home', {
            title: "Home",
            products,
            categories,
            toThousand
        })
    
    },
   
    dashboard :  (req,res) =>{
        return res.render('dashboard', {
            title: "Dashboard de administración"
        })
}
}