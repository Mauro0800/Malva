const db = require('../database/models');
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
                    exclude: ['createdAt', 'updatedAt', 'image', 'categoryId', 'brandId', 'materialId'],
                    include: [literalQueryUrlDetailProduct(req, 'product.id', 'detailUrl'), literalQueryUrlImageProduct(req, 'image', 'imageUrl')] // Detalle del producto e imágen con su respectiva URL
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
    getAllCategories: async () => {
        try {
            const categories = await db.Category.findAll({ include: ['products'] });
            return categories
        } catch (error) {
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
    }
}