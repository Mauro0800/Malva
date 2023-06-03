const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    list: (req, res) => {
        db.Product.findAll({
            attributes: [`id`, `name`, `price`,`discount`,`image`,]
        }).then((products) => {
                // return res.send(products)
                return res.render("list", {
                    title: "Todos Los productos",
                    products,
                    toThousand
                })
            })
            .catch(error => console.log(error))


    },
    category: async (req, res) => {

        const {idCategory} = req.params;
        const category = await db.Category.findByPk(idCategory);
        db.Product.findAll({
            where: {
                categoryId: idCategory
            },
            include: ["category"]
        })
            .then(products => {
                return res.render("list", {
                    title: idCategory ? category.dataValues.name : "Todos los productos",
                    products,
                    toThousand
                })
            })
            .catch(error => console.log(error))

    },
    detail: (req, res) => {
        const { id } = req.params
        const product = db.Product.findByPk(id, {
            include: ["brand", "category", "material", "images"]
        })
        const images = db.Image.findAll({
            where: {
                productId: id
            }
        });
        Promise.all([product, images])
            .then(([product, images]) => {

                if (!product) {
                    return res.redirect("/")
                  }

                return res.render("detailproduct", {
                    title: "Detalle",
                    ...product.dataValues,
                    images,
                    toThousand
                })
            })
            .catch(error => console.log(error))

    },

    shoppingcart: (req, res) => {

        const categories = db.Category.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });

        const productsToAdd = db.Product.findAll({
                    limit: 10,
                    include: ["category"]
                });
        Promise.all([categories, productsToAdd])
        .then(([categories, productsToAdd]) => {
            return res.render('shoppingcart', {
                title: "Carrito de compras",
                categories,
                productsToAdd,
                toThousand
            })
        }).catch(error=>console.log(error))
    },

    addproduct: (req, res) => {
        const brands = db.Brand.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const materials = db.Material.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        Promise.all([brands,materials])
            .then(([brands, materials]) => {
                return res.render('addproduct', {
                    brands,
                    materials,
                    title: "Agregar producto"
                })
            })
            .catch(error => console.log(error))
    },

    store: (req, res) => {

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
    editproduct: (req, res) => {
        const { id } = req.params
        const product = db.Product.findByPk(id, {
            include: ["images"]
        })
        const brands = db.Brand.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const materials = db.Material.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const images = db.Image.findAll({
            where: {
                productId: id
            }
        });
        Promise.all([product, brands, materials, images])
            .then(([product, brands, materials, images]) => {
                if (!product) {
                    return res.redirect("/")
                  }
                return res.render('editproduct', {
                    ...product.dataValues,
                    brands,
                    materials,
                    images,
                    title: "Editar producto"
                })
            })
            .catch(error => console.log(error))
    },
    update: async (req, res) => {

        const id = +req.params.id;
        const {name, price, description, discount, stock, brand, category, material,image} = req.body;
        const productOld=db.Product.findByPk(id)
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
                    productOld.then(product=>{
                            fs.existsSync(`public/images/products/${product.image}`) &&
                            fs.unlinkSync(`public/images/products/${product.image}`);
                        })
                }
                    
                
                       await db.Image.findAll({
                            where : {
                                productId : id
                            }
                        })
                            .then(images => {
                                
                                if(req.files.images){
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
                                
                                }
                                
                            })
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
                    /* return res.send({
                        product,
                        brands,
                        materials,
                        images,
                        errors: errors.mapped(),
                        old: req.body,
                        title: "Editar producto"
                    }) */
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
    destroy: (req, res) => {

        db.Product.destroy({
            where: {
              id: req.params.id
            }
          }).then(() => {
            return res.redirect('/products')
          }).catch((error) => console.log(error))
        }
}