module.exports ={
    home : (req,res) =>{
        return res.render('home', {
            title: "Home"
        })
    
    },
   
    dashboard :  (req,res) =>{
        return res.render('dashboard', {
            title: "Dashboard de administración"
        })
}
}