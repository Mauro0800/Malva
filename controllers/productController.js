const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const fs = require('fs');
const products = require('../data/products.json');
module.exports = {

    index : (req,res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("list",{
            products,
            toThousand
        })
    },
    productdetail: (req, res) => {
        return res.render('productdetail', {
            title: "Detalle del producto"
        })
    },

    shoppingcart: (req, res) => {
        return res.render('shoppingcart', {
            title: "Carrito de compras"
        })

    },
    addproduct: (req, res) => {
        return res.render('addproduct', {
            title: "Agregar producto"
        })
    },
    editproduct: (req, res) => {
        return res.render('editproduct', {
            title: "Editar producto"
        })
    },
    store: (req, res) => {
        const {name, price, discount, description, section, categoría, marca } = req.body;

        const newproduct ={
            id: products[products.length -1].id +1,
           name:name,
            price: +price,
            discount: +discount,
            description: description,
            marca,
            categoría,
            section,
            imagen:null
        }
        /*return res.send(newproduct)*/
      products.push(newproduct);

        fs.writeFileSync('./data/products.json',JSON.stringify(products, null, 3),'utf-8')
    
        return res.redirect('/products/list');
    }
};