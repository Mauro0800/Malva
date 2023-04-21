const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    list: (req, res) => {

        const products = db.Product.findAll();
        const categories = db.Category.findAll();

        Promise.all([products, categories])
            .then(([products, categories]) => {

                return res.render("list", {
                    title: "Todos Los productos",
                    products,
                    categories,
                    toThousand
                })
            })
            .catch(error => console.log(error))


    },
    category: (req, res) => {

        const { idCategory } = req.params;

        const products = db.Product.findAll({
            where: {
                categoryId: idCategory
            }
        })
        const categories = db.Category.findAll();

        Promise.all([products, categories])
            .then(([products, categories]) => {
                return res.render("list", {
                    title: idCategory ? products[0].category.name : "Todos los productos",
                    products,
                    categories,
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
        const categories = db.Category.findAll();
        const images = db.Image.findAll({
            where: {
                productId: id
            }
        });
        Promise.all([product, categories, images])
            .then(([product, categories, images]) => {

                if (!product) {
                    return res.redirect("/")
                  }

                return res.render("productdetail", {
                    title: "Detalle",
                    ...product.dataValues,
                    categories,
                    images,
                    toThousand
                })
            })
            .catch(error => console.log(error))

    },

    shoppingcart: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                return res.render('shoppingcart', {
                    categories,
                    title: "Carrito de compras"
                })
            })
            .catch(error => console.log(error))
    },

    addproduct: (req, res) => {
        const categories = db.Category.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const brands = db.Brand.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        const materials = db.Material.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
        Promise.all([categories, brands, materials])
            .then(([categories, brands, materials]) => {
                return res.render('addproduct', {
                    categories,
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

            const categories = db.Category.findAll({
                order: [["name"]],
                attributes: ["name", "id"],
            });
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

            Promise.all([categories, brands, materials])
                .then(([categories, brands, materials]) => {
                    // return res.send([errors.mapped(),req.files.image[0].filename,req.files.image])
                    return res.render("addproduct", {
                        title: "Agregar producto",
                        brands,
                        categories,
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
        const categories = db.Category.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
        });
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
        Promise.all([product, categories, brands, materials,images])
            .then(([product, categories,brands,materials,images]) => {
                if (!product) {
                    return res.redirect("/")
                  }
                return res.render('editproduct', {
                    ...product.dataValues,
                    categories,
                    brands,
                    materials,
                    images,
                    title: "Editar producto"
                })
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {

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

      const id = +req.params.id;

        if (errors.isEmpty()) {
            const {name, price, description, discount, stock, brand, category, material,image} = req.body;
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
              ).then(() => {

                        db.Image.findAll({
                            where : {
                                productId : id
                            }
                        })
                            .then(images => {
                                console.log(req.files.images);
                                if(req.files.images){
                                    req.files.images.forEach((image,index) =>{
                                            console.log(image);
                                            db.Image.update(
                                            {
                                              images: req.files && req.files.images ? image.filename : images.name,
                                            },
                                            {
                                                where : {
                                                    porductId : id
                                                }
                                            }
                                        )
                                    })
                                }
                                // console.log(req.files.images);
                            })
                        return res.redirect("/products/detail/"+id);

                    })
                 
                .catch(error => console.log(error))
        } else {

            const { id } = +req.params
            const product = db.Product.findByPk(id, {
                include: ["images"]
            })
            const categories = db.Category.findAll({
                order: [["name"]],
                attributes: ["name", "id"],
            });
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
            
            Promise.all([product, categories, brands, materials,images])
                .then(([product, categories,brands,materials,images]) => {

                    return res.render('editproduct/'+id, {
                        ...product.dataValues,
                        categories,
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