const db = require('../database/models');
const { Op } = require('sequelize');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    home: (req, res) => {

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


        Promise.all([productsHome, productsdistinguished])
            .then(([productsHome, productsdistinguished]) => {
                // return res.send(categories)

                return res.render("home", {
                    title: "Home",
                    productsHome,
                    productsdistinguished,
                    toThousand
                })
            })
            .catch(error => console.log(error))
    },

    dashboard: (req, res) => {
        return res.render('dashboard', {
            title: "Dashboard"
        })
    },

    search: (req, res) => {
        const { keywords } = req.query;

        db.Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: keywords
                        }
                    },
                    {
                        description: {
                            [Op.substring]: keywords
                        }
                    }
                ]
            },
            include: ["category"]
        })
        .then(productsFiltered => {
            return res.render('results', {
                title : 'Resultados de la busqueda',
                productsFiltered,
                toThousand,
                keywords
            });
        }).catch(error => console.log(error))
    }
}