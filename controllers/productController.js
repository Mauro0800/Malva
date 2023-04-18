const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    list: (req, res) => {

        const products = db.Product.findAll();
        const categories = db.Category.findAll();

        Promise.all([products, categories])
            .then(([products, categories]) => {
                // return res.send(products)

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
                // return res.send(products)
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
                // return res.send(images)
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

        if (!req.files.length && !req.fileValidationError) {
            errors.errors.push({
              value: "",
              msg: "El producto debe tener una imagen principal",
              param: "image",
              location: "files",
            });
          }
        
        if (!req.files.length && !req.fileValidationError) {
            errors.errors.push({
              value: "",
              msg: "El producto debe tener minimo una imagen secundaria",
              param: "images",
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

          if (req.fileValidationError) {
            errors.errors.push({
              value: "",
              msg: req.fileValidationError,
              param: "images",
              location: "files",
            });
          }

        if (errors.isEmpty()){
            const { name, price, description, discount, stock, image, brandId, categoryId, materialId, images } = req.body;
            db.Product.create({
                name: name.trim(),
                price: +price,
                description: description.trim(),
                discount,
                stock,
                image,
                brandId,
                categoryId,
                materialId,
            })
                .then((product) => {
                    req.files.forEach(image => {
                        db.Image.create({
                            name: image.filename,
                            productId: product.id,
                        });
                        return res.redirect("/products");
                    });
                })
                .catch(error => console.log(error))


            return res.send(req.body);

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

            if (req.files.length) {
                req.files.forEach((file) => {
                    fs.existsSync(`./public/images/products/${file.filename}`) &&
                        fs.unlinkSync(`./public/images/products/${file.filename}`);
                });
            }

            Promise.all([categories, brands, materials])
                .then(([categories, brands, materials]) => {
                    return res.render("addproduct", {
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
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        res.render("editproduct", {
            ...product,
            categories,
            title: "Editar Producto"
        })
    },
    update: (req, res) => {
        const { id } = req.params
        const product = products.find(product => product.id === +id);
        const { name, price, discount, category, description, stock, brand, material } = req.body

        const productModified = {
            id: +id,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category: category,
            description: description.trim(),
            image: product.image,
            stock: +stock,
            brand: brand,
            material: material
        }

        const productosActualizados = products.map(product => {
            if (product.id === +id) {
                return productModified
            }
            return product
        })
        fs.writeFileSync('./data/products.json', JSON.stringify(productosActualizados, null, 3), 'utf-8')

        return res.redirect(`/products/detail/${id}`)
    },
    destroy: (req, res) => {

        const { id } = req.params;
        const productModified = products.filter(product => product.id !== +id)
        fs.writeFileSync(productsFilePath, JSON.stringify(productModified, null, 3), 'utf-8');
        res.redirect('/products')
    }
}