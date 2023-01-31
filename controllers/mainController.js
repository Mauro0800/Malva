module.exports ={
    home : (req,res) =>{
        return res.render('home', {
            title: "Home"
        })
    },
    login :  (req,res) =>{
        return res.render('login', {
            title: "Ingresá a tu cuenta"
        })
    },
    productdetail :  (req,res) =>{
        return res.render('productdetail', {
            title: "Detalle del producto"
        })
    },
    register :  (req,res) =>{
        return res.render('register', {
            title: "Registrá tu cuenta"
        })
    },
    resetpassword :  (req,res) =>{
        return res.render('resetpassword', {
            title: "Restablecer mi contraseña"
        })
    },
    shoppingcart :  (req,res) =>{
        return res.render('shoppingcart', {
            title: "Carrito de compras"
        })
    },
    dashboard :  (req,res) =>{
        return res.render('dashboard', {
            title: "Dashboard de administración"
        })
    },
    addproduct :  (req,res) =>{
        return res.render('addproduct', {
            title: "Agregar producto"
        })
    }
}