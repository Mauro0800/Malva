module.exports ={
   login :  (req,res) =>{
        return res.render('login', {
            title: "Ingresá a tu cuenta"
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
    }
};