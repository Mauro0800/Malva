const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports ={
    home : (req,res) =>{
        
        const productsHome = db.Product.findAll({
            where: {
                home: true,
              },
            include: ["category"]
        })
        const productsdistinguished = db.Product.findAll({
            where: {
                distinguished: true
              },
            include: ["category"]
        });
        // const categories =  db.Category.findAll();


        Promise.all([productsHome,productsdistinguished])
        .then(([productsHome,productsdistinguished]) =>{
            // return res.send(categories)

            return res.render("home", {
                title: "Home",
                productsHome,
                productsdistinguished,
                toThousand
            })
        })
        .catch(error=>console.log(error))
        
        
    },
   
    dashboard :  (req,res) =>{
        return res.render('dashboard', {
            title: "Dashboard de administración"
        })
}
}