const products = require('../data/products.json');

module.exports ={
   
    productdetail :  (req,res) =>{
        const productDetails = products.find(productDetails => productDetails.id === +req.params.id);
        return res.render('productdetail', {
            title: "Detalle del producto",
            ...productDetails,
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