const db = require('../database/models');
const Op = require("sequelize")
const { literalQueryUrlImageProduct, literalQueryUrlDetailProduct } = require('../helpers');

module.exports = {
    getAllProducts: async (req) => { // Obteniendo todos los productos
        try {
            const { count, rows: products } = await db.Product.findAndCountAll({ // Trae todas las relaciones
                include: [
                    {
                        association: "category",
                        attributes: ["name"],
                    },
                    {
                        association: "brand",
                        attributes: ["name"],
                    },
                    {
                        association: "material",
                        attributes: ["name"],
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'image', 'categoryId', 'brandId', 'materialId']
                }
            })
            return {
                count,
                products,
            };
        } catch (error) {
            console.log(error);
            throw {
                status: 500,
                message: error.message,
            };
        }
    },
    getProductById: async (id, req) => {
        try {
            const product = await db.Product.findByPk(id, {
                include: [
                    {
                        association: "category",
                        attributes: ["name"],
                    },
                    {
                        association: "brand",
                        attributes: ["name"],
                    },
                    {
                        association: "material",
                        attributes: ["name"],
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'image', 'categoryId', 'brandId', 'materialId'],
                    include: [literalQueryUrlImageProduct(req, 'image', 'urlImage')]
                }
            })
            return product
        }
        catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    storeProduct: async (data, req) => {
        try {
            const { name, price, description, discount, stock, categoryId, brandId, materialId } = data;

            const newProduct = await db.Product.create({
                name: name.trim(),
                price,
                description: description.trim(),
                discount: discount || 0,
                stock,
                image: req.file ? req.file.filename : 'default-image.png',
                categoryId,
                brandId: brandId || 7,
                materialId
            });

            return newProduct;

        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    updateProduct: async (id,req) => {
        try {
            const { name, price, description, discount, stock, categoryId, brandId, materialId } = req.body
            const product = await db.Product.findByPk(id)
            const productUpdated = await db.Product.update(
                {
                    name: name ? name.trim() : name,
                    price: price ? price : product.price,
                    description: description ? description.trim() : description,
                    discount: discount ? discount : product.discount,
                    stock: stock ? stock : product.stock,
                    categoryId: categoryId ? categoryId : product.categoryId,
                    brandId: brandId ? brandId : product.brandId,
                    materialId: materialId ? materialId : product.materialId
                },
                {
                    where: {
                        id
                    }
                }
            )
            return productUpdated
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    deleteProduct: async (id) => {
        try {
            const deletedProduct = db.Product.destroy(
                {
                    where: {id}
                }
            )
            return deletedProduct

        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getCategoryById: async (id) => {
        try {
            const category = await db.Category.findByPk(id);
            return category;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getAllCategoriesCount : async () => {
        try {
            const count = await db.Product.findAll({
            attributes: [
              [db.sequelize.literal('(SELECT name FROM Categories WHERE Categories.id = Product.categoryId)'), 'Categoria'],
              [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'Total']
            ],
            group: ['categoryId']
          });

          return count;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
        
    },
    getAllBrandsCount : async () => {
        try {
           const count = await db.Product.findAll({
            attributes: [
              [db.sequelize.literal('(SELECT name FROM Brands WHERE Brands.id = Product.brandId)'), 'Marca'],
              [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'Total']
            ],
            group: ['brandId']
          });
        return count; 
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
        
    },
    getAllMaterialsCount : async () => {
        try {
            const count = await db.Product.findAll({
            attributes: [
              [db.sequelize.literal('(SELECT name FROM Materials WHERE Materials.id = Product.materialId)'), 'Material'],
              [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'Total']
            ],
            group: ['materialId']
          });
        return count;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
       
    },

    getAllCount: async ()=> {
        try {
            
            const countBrands = await db.Brand.count()

            for (let i = 0; i < countBrands-1; i++) {
                
                
            }
            const count = await db.Product.count({
                include: [{
                  model: db.Brand,
                  association:"brand",
                  where: {
                    name: "trademark"
                  }
                }]
              });
            return count

        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
        
    },
    getAllBrands: async ()=> {
        try {
            const { count, rows: brands } = await db.Brand.findAndCountAll();
            return {brands,countBrand:count}
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getAllMaterials: async ()=> {
        try {
            const { count, rows: materials } = await db.Material.findAndCountAll();
            return {materials,countMaterial:count}
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getAllCategories: async () => {
        try {
            const { count, rows: categories } = await db.Category.findAndCountAll({include:["products"]});
            return {categories,countCategory:count}
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

}