const db = require('../database/models');
const { literalQueryUrlImage, literalQueryUrlDetail } = require('../helpers');

module.exports = {
    getAllProducts: async (req) => { // Obteniendo todos los productos
        try {
            const products = await db.Product.findAll({ // Trae todas las relaciones
                include: [{
                    association: 'images', 
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'], // Excluye fecha de creación y actualización
                        include: [literalQueryUrlDetail(req, 'productId', 'detailUrl'), literalQueryUrlImage(req, 'image', 'imageUrl')] // Detalle del producto e imágen con su respectiva URL
                    }
                }]
            })
            return products;
        } catch (error) { // Si buscando encuentra un error, ...
            console.log(error);
            throw { // ... arroja estado y mensaje de dicho error
                status: 500,
                message: error.message
            }
        }
    },
    getByIdProduct: async (id) => { // Obteniendo un producto por ID
        try {
            const product = await db.Product.findByPk(id, { // Trae las relaciones según la clave foránea
                include: [{
                    association: 'images',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'], // Excluye fecha de creación y actualización
                    }
                }]
            })
            return product;
        } catch (error) { // Si buscando encuentra un error, ...
            console.log(error);
            throw { // ... arroja estado y mensaje de dicho error
                status: 500,
                message: error.message
            }
        }
    }
}