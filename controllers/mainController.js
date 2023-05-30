const {getAllUsers, getUserById, } = require('../services/userServices')
const {getAllProducts, getAllBrands, getAllMaterials, getAllCategories, getAllCategoriesCount, getAllBrandsCount, getAllMaterialsCount} = require('../services/productsServices')
const db = require('../database/models');
const { validationResult } = require("express-validator");
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
    },
   
    dashboardAdmin : async  (req,res) =>{
        const {users} = await getAllUsers(req);
        return res.render("dashboardAdmin",{
            title:"Usuarios",
            users,
        }) 
    },
    dashboardUsersDetail : async  (req,res) =>{
        const id = +req.params.id
        const user = await getUserById(id,req);
        // return res.send(user)
        return res.render("dashboardUsersDetail",{
            title:"Usuarios",
            user,
        }) 
    },
    dashboardOrders :  (req,res) =>{
        return res.render('dashboardOrders', {
            title: "Ordenes"
        })
    },
    dashboardAdd : async  (req,res) =>{

        const {products,count} = await getAllProducts(req)
        const {users,countUser} = await getAllUsers(req);
        const {brands,countBrand} = await getAllBrands();
        const materialCount = await getAllMaterialsCount();
        const brandCount = await getAllBrandsCount();
        const categoryCount = await getAllCategoriesCount();
        const {materials,countMaterial} = await getAllMaterials();
        const {categories,countCategory} = await getAllCategories();
    //     res.send(brandCount)
    //    return console.log(brandCount)
            return res.render('dashboardAdd', {
                products,
                users,
                brands,
                materials,
                categories,
                count,
                countUser,
                countBrand,
                countMaterial,
                countCategory,
                materialCount,
                brandCount,
                categoryCount,
                title: "Agregar"
            })
    },

    dashboardBrand : async (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try{
                const {addBrand} = req.body;
                db.Brand.create({
                    name: addBrand.trim()
                })

                return res.redirect("/dashboardAdd");
            }
            catch (error) {
                 console.log(error)
            }
        } else {
            
        try {
            const {products,count} = await getAllProducts(req)
            const {users,countUser} = await getAllUsers(req);
            const {brands,countBrand} = await getAllBrands();
            const materialCount = await getAllMaterialsCount();
            const brandCount = await getAllBrandsCount();
            const categoriesCount = await getAllCategoriesCount();
            const {materials,countMaterial} = await getAllMaterials();
            const {categories,countCategory} = await getAllCategories();
            return res.render('dashboardAdd', {
                products,
                users,
                brands,
                materials,
                categories,
                count,
                countUser,
                countBrand,
                countMaterial,
                countCategory,
                materialCount,
                brandCount,
                categoriesCount,
                title: "Agregar"
            })
        } catch (error) {
            console.log(error)};
        }
    },

    dashboardMaterial : async (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try{
                const {addMaterial} = req.body;
                db.Material.create({
                    name: addMaterial.trim()
                })
                return res.redirect("/dashboardAdd");
            }
            catch (error) {
                 console.log(error)
            }
        } else {
            
        try {
            const {products,count} = await getAllProducts(req)
            const {users,countUser} = await getAllUsers(req);
            const {brands,countBrand} = await getAllBrands();
            const materialCount = await getAllMaterialsCount();
            const brandCount = await getAllBrandsCount();
            const categoriesCount = await getAllCategoriesCount();
            const {materials,countMaterial} = await getAllMaterials();
            const {categories,countCategory} = await getAllCategories();
            return res.render('dashboardAdd', {
                products,
                users,
                brands,
                materials,
                categories,
                count,
                countUser,
                countBrand,
                countMaterial,
                countCategory,
                materialCount,
                brandCount,
                categoriesCount,
                title: "Agregar"
            })
        } catch (error) {
            console.log(error)};
        }
    },

    dashboardCategory : async (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try{
                const {addCategory} = req.body;
                db.Category.create({
                    name: addCategory.trim()
                })
                return res.redirect("/dashboardAdd");
            }
            catch (error) {
                 console.log(error)
            }
        } else {
            
        try {
            const {products,count} = await getAllProducts(req)
            const {users,countUser} = await getAllUsers(req);
            const {brands,countBrand} = await getAllBrands();
            const materialCount = await getAllMaterialsCount();
            const brandCount = await getAllBrandsCount();
            const categoriesCount = await getAllCategoriesCount();
            const {materials,countMaterial} = await getAllMaterials();
            const {categories,countCategory} = await getAllCategories();
            return res.render('dashboardAdd', {
                products,
                users,
                brands,
                materials,
                categories,
                count,
                countUser,
                countBrand,
                countMaterial,
                countCategory,
                materialCount,
                brandCount,
                categoriesCount,
                title: "Agregar"
            })
        } catch (error) {
            console.log(error)};
        }
    },

    dashboardProduct : async  (req,res) => {

            const errors = validationResult(req);
            
            if (req.fileValidationError) {
                errors.errors.push({
                    value: "",
                    msg: req.fileValidationError,
                    param: "image",
                    location: "files",
                });
            }
    
            if (req.fileValidationError) {
                errors.errors.push({
                    value: "",
                    msg: req.fileValidationError,
                    param: "images",
                    location: "files",
                });
            }
            
            if (!req.files.image && !req.fileValidationError) {
                errors.errors.push({
                    value: "",
                    msg: "El producto debe tener una imagen principal",
                    param: "image",
                    location: "file",
                });
            }
    
            if (!req.files.images && !req.fileValidationError) {
                errors.errors.push({
                    value: "",
                    msg: "El producto debe tener minimo una imagen secundaria",
                    param: "images",
                    location: "files",
                });
            }
    
    
            if (errors.isEmpty()) {
                const {name, price, description, discount, stock, brand, category, material} = req.body;
                db.Product.create({
                    name: name.trim(),
                    price: +price,
                    description: description.trim(),
                    discount,
                    stock,
                    image: req.files ? req.files.image[0].filename : null,
                    brandId:brand,
                    categoryId:category,
                    materialId:material,
                })
    
                    .then((product) => {
                        req.files.images.forEach(image => {
                            db.Image.create({
                                name: image.filename,
                                productId: product.id,
                            });
    
                            return res.redirect("/products");
    
                        });
                    })
                    .catch(error => console.log(error))
            } else {
    
                const brands = db.Brand.findAll({
                    order: [["name"]],
                    attributes: ["name", "id"],
                });
                const materials = db.Material.findAll({
                    order: [["name"]],
                    attributes: ["name", "id"],
                });
    
                if (req.files && req.files.image) {
                        fs.existsSync(`./public/images/products/${req.files.image[0].filename}`) &&
                        fs.unlinkSync(`./public/images/products/${req.files.image[0].filename}`);
                    }
                
                if (req.files && req.files.images) {
                    req.files.images.forEach(files => {
                        fs.existsSync(`./public/images/products/${files.filename}`) &&
                        fs.unlinkSync(`./public/images/products/${files.filename}`);
                    });
                }
    
                Promise.all([brands, materials])
                    .then(([brands, materials]) => {
                        // return res.send([errors.mapped(),req.files.image[0].filename,req.files.image])
                        return res.render("addproduct", {
                            title: "Agregar producto",
                            brands,
                            materials,
                            errors: errors.mapped(),
                            old: req.body,
                        });
                    })
                    .catch((error) => console.log(error));
            }
    
    
        },

}