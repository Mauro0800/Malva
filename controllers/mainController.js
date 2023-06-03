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
        db.User.findAll({
            where: {
                rolId: 1
            }
        })
        .then(users => {
            return res.render("dashboardAdmin",{
                title:"Admins",
                users,
            }) 
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
                const {addBrandInput} = req.body;
                db.Brand.create({
                    name: addBrandInput.trim()
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
            const categoryCount = await getAllCategoriesCount();
            const {materials,countMaterial} = await getAllMaterials();
            const {categories,countCategory} = await getAllCategories();
            console.log(errors.mapped());
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
                errors: errors.mapped(),
                old: req.body,
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
                const {addMaterialInput} = req.body;
                db.Material.create({
                    name: addMaterialInput.trim()
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
            const categoryCount = await getAllCategoriesCount();
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
                categoryCount,
                errors: errors.mapped(),
                old: req.body,
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
                const {addCategoryInput} = req.body;
                db.Category.create({
                    name: addCategoryInput.trim()
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
                const categoryCount = await getAllCategoriesCount();
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
                        categoryCount,
                        errors: errors.mapped(),
                        old: req.body,
                        title: "Agregar"
                })
            } catch (error) {
                console.log(error)
            };
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
                errors: errors.mapped(),
                old: req.body,
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
            
            try {
                const {products,count} = await getAllProducts(req)
                const {users,countUser} = await getAllUsers(req);
                const {brands,countBrand} = await getAllBrands();
                const materialCount = await getAllMaterialsCount();
                const brandCount = await getAllBrandsCount();
                const categoryCount = await getAllCategoriesCount();
                const {materials,countMaterial} = await getAllMaterials();
                const {categories,countCategory} = await getAllCategories();
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
                        errors: errors.mapped(),
                        old: req.body,
                        title: "Agregar"
                    })
                } catch (error) {
                    console.log(error)
                };
        }
        },
        dashboardUser: async (req, res) => {

            const errors = validationResult(req);
    
            if (errors.isEmpty()) {
    
                const { name, surname, email, password } = req.body;
    
                db.Address.create()
                    .then(address => {
                        db.User.create({
                            name: name.trim(),
                            surname: surname.trim(),
                            email: email.trim(),
                            password: hashSync(password, 12),
                            image: 'default-image.jpg',
                            rolId: 2,
                            addressId: address.id
                        })
                            .then(({ id, name, rolId }) => {
    
                                req.session.userLogin = {
                                    id,
                                    name,
                                    rol: rolId
                                };
                                return res.redirect('/');
                            })
    
                    }).catch(error => console.log(error))
            } else {
                try {
                    const {products,count} = await getAllProducts(req)
                    const {users,countUser} = await getAllUsers(req);
                    const {brands,countBrand} = await getAllBrands();
                    const materialCount = await getAllMaterialsCount();
                    const brandCount = await getAllBrandsCount();
                    const categoryCount = await getAllCategoriesCount();
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
                            categoryCount,
                            errors: errors.mapped(),
                            old: req.body,
                            title: "Agregar"
                    })
                } catch (error) {
                    console.log(error)
                };
            }
        },

}