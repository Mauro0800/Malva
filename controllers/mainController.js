const {getAllUsers} = require('../services/userServices')
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


        Promise.all([productsHome,productsdistinguished])
        .then(([productsHome,productsdistinguished]) =>{

            return res.render("home", {
                title: "Home",
                productsHome,
                productsdistinguished,
                toThousand
            })
        })
        .catch(error=>console.log(error))
        
        
    },
   
    dashboardUsers : async  (req,res) =>{

        return res.render("dashboardUsers",{
            title:"Usuarios"
        }) 

        
    },
    dashboardProducts :  (req,res) =>{
        return res.render('dashboardProducts', {
            title: "Productos"
        })
    },
    dashboardOrders :  (req,res) =>{
        return res.render('dashboardOrders', {
            title: "Ordenes"
        })
    },
}