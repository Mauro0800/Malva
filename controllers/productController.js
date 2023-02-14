const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports ={
   
    index : (req,res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("list",{
            products,
            toThousand
        })
    },
    productdetail :  (req,res) =>{
        return res.render('productdetail', {
            title: "Detalle del producto"
        })
    },
    
    shoppingcart :  (req,res) =>{
        return res.render('shoppingcart', {
            title: "Carrito de compras"
        })
    
    },
    addproduct :  (req,res) =>{
        return res.render('addproduct', {
            title: "Agregar producto"
        })
    },
    editproduct :  (req,res) =>{
        return res.render('editproduct', {
            title: "Editar producto"
        })
    },
}