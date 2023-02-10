module.exports ={
   
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