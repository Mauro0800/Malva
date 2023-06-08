const db = require('../database/models');
const fs = require('fs');
const { hashSync } = require('bcryptjs');
const { validationResult } = require("express-validator");
const { Op } = require('sequelize');
const {getAllUsers, getUserById, } = require('../services/userServices')
const {getAllProducts, getAllBrands, getAllMaterials, getAllCategories, getAllCategoriesCount, getAllBrandsCount, getAllMaterialsCount} = require('../services/productsServices')
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

                return res.redirect("/dashboard");
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
                return res.redirect("/dashboard");
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
                return res.redirect("/dashboard");
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

                        return res.redirect("/products/#redes");

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
    dashboardUpdate: async (req,res) =>{
        

        const id = +req.params.id;
        const {name, price, description, discount, stock, brand, category, material,image} = req.body;
        const productOld=db.Product.findByPk(id)
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {
            
            db.Product.update({
                name: name.trim(),
                price: +price,
                description: description.trim(),
                discount,
                stock,
                image: req.files.image ? req.files.image[0].filename : image,
                brandId:brand,
                categoryId:category,
                materialId:material,
            },
            {
                where: {
                  id,
                },
              }
            ).then(async () => {
                if(req.files.image && req.files.image.length){

                    let error = false;

                    await db.Image.findAll({
                    where : {
                        productId : id
                    }
                    })
                    .then(async(images) => {
                    images.forEach(image=>{
                            productOld.then(product=>{
                                image.name===product.image ? error = true : null
                            })
                        })
                    })
                    if(error===true){
                    productOld.then(product=>{
                            fs.existsSync(`public/images/products/${product.image}`) &&
                            fs.unlinkSync(`public/images/products/${product.image}`);
                        })
                    }
                }
                    
                
                if(req.files.images){
                       await db.Image.findAll({
                            where : {
                                productId : id
                            }
                        })
                            .then(images => {
                                
                                    db.Image.destroy({
                                        where:{
                                            productId:id
                                        }
                                    })

                                    req.files.images.forEach(async(image)=>{
                                       await db.Image.create(
                                        {
                                            name: image.filename,
                                            productId : id
                                        }
                                    )
                                })

                                
                                    images.forEach(image => {
                                        fs.existsSync(`public/images/products/${image.name}`) &&
                                        fs.unlinkSync(`public/images/products/${image.name}`);
                                    });
                                
                                    
                                })
                            }
                        return res.redirect("/products/detail/"+id);
                            
                    })
                 
                .catch(error => console.log(error))
        } else {

            const id = +req.params.id
            const product = await db.Product.findByPk(id, {
                include: ["images"]
            })
            const brands = await db.Brand.findAll({
                order: [["name"]],
                attributes: ["name", "id"],
            });
            const materials = await db.Material.findAll({
                order: [["name"]],
                attributes: ["name", "id"],
            });
            const images = await db.Image.findAll({
                where: {
                    productId: id
                }
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
            
            Promise.all([product, brands, materials, images])
                .then(([product, brands, materials, images]) => {
                    return res.render('editproduct', {
                        ...product.dataValues,
                        brands,
                        materials,
                        images,
                        errors: errors.mapped(),
                        old: req.body,
                        title: "Editar producto"
                    })
                })
                .catch((error) => console.log(error));
        }
    },
    dashboardUser: async (req, res) => {

        const errors = validationResult(req);
        const { nameUser, surname, email, password } = req.body;
        // return res.send([req.body,req.file])

        if (errors.isEmpty()) {


            db.Address.create()
                .then(address => {
                    db.User.create({
                        name: nameUser.trim(),
                        surname: surname.trim(),
                        email: email.trim(),
                        password: hashSync(password, 12),
                        image: req.file ? req.file.filename : 'default-image.jpg',
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

                (req.file && fs.existsSync('./public/images/users/' + req.file.filename)) && fs.unlinkSync('./public/images/users/' + req.file.filename)

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
    dashboardProductDetail: async (req,res) => {
        const id = +req.params.id
        const product = db.Product.findByPk(id);
        const brands = await db.Brand.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const materials = await db.Material.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        Promise.all([product, brands, materials,])
            .then(([product, brands, materials,]) => {
            // return res.send(product)
            return res.render("dashboardProductDetail",{
                brands,
                materials,
                ...product.dataValues,
                title:"Product",
            })
        })
    },
    dashboardUsersDetail : async  (req,res) =>{
        const id = +req.params.id
        const user = await getUserById(id,req);
        return res.render("dashboardUsersDetail",{
            title:"Usuarios",
            user,
        }) 
    },
    dashboardUserUpdate : async (req,res) => {
        const errors = validationResult(req);

        if(!req.session.userLogin){
            return res.redirect('/users/profile') 
        }
        const { name, surname, address, city, province, zipCode } = req.body
        const { id } = req.session.userLogin;

        if (req.fileValidationError) {
            errors.errors.push({
                value: "",
                msg: req.fileValidationError,
                param: "image",
                location: "files",
            });
        }
    
        if(errors.isEmpty()) {
        db.User.findByPk(id)
            .then(user => {

                const addressUpdated = db.Address.update(
                    {
                        address: address ? address.trim() : null,
                        city: city ? city.trim() : null,
                        province: province ? province.trim() : null,
                        zipCode: zipCode ? zipCode : null
                    },
                    {
                        where: {
                            id: user.addressId
                        }
                    }
                )
                const userUpdated = db.User.update(
                    {
                        name: name.trim(),
                        surname: surname.trim(),
                        image: req.file ? req.file.filename : user.image
                    },
                    {
                        where: {
                            id
                        }
                    }
                )
                Promise.all(([addressUpdated, userUpdated]))
                    .then(() => {
                        (req.file && fs.existsSync('./public/images/users/' + user.image)) && fs.unlinkSync('./public/images/users/' + user.image)
                        req.session.message = "Datos actualizados"
                        // return res.send([user,req.file])
                        return res.redirect('/users/profile')
                    })
            }).catch(error => console.log(error))
        }else{
            try {
                const {products,count} = await getAllProducts(req)
                const {users,countUser} = await getAllUsers(req);
                const {brands,countBrand} = await getAllBrands();
                const materialCount = await getAllMaterialsCount();
                const brandCount = await getAllBrandsCount();
                const categoryCount = await getAllCategoriesCount();
                const {materials,countMaterial} = await getAllMaterials();
                const {categories,countCategory} = await getAllCategories();

                (req.file && fs.existsSync('./public/images/users/' + req.file.filename)) && fs.unlinkSync('./public/images/users/' + req.file.filename)

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
    }
}