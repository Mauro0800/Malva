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
    getAllCategories : async () => {
        try {
          const categories = await db.Category.findAll({include:['products']});
      return categories 
     } catch (error){
         throw {
             status : 500,
             message : error.message
         }
     }
    }
}