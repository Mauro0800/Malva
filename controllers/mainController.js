module.exports ={
    home : (req,res) =>{
        return res.render('home')
    },
    login :  (req,res) =>{
        return res.render('login')
    },
    productdetail :  (req,res) =>{
        return res.render('productdetail')
    },
    register :  (req,res) =>{
        return res.render('register')
    },
    resetpassword :  (req,res) =>{
        return res.render('resetpassword')
    },
    shoppingcart :  (req,res) =>{
        return res.render('shoppingcart')
    },
    dashboard :  (req,res) =>{
        return res.render('dashboard')
    },
    addproduct :  (req,res) =>{
        return res.render('addproduct')
    }
}