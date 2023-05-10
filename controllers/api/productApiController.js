const { getAllProducts, getProductById, getAllCategories, storeProduct, updateProduct, deleteProduct } = require('../../services/productsServices');
const errorResponse = require('../../helpers/errorResponse');


module.exports = {
    index: async (req, res) => {
        try {
            const products = await getAllProducts(req); // Esperando que la función se procese y responda
            const categories = await getAllCategories()
            const countByCategory = categories.reduce((obj,category)=>{
                obj[category.name] = category.products.length
                return obj
            },{})
            return res.status(200).json({ // Respuesta de petición exitosa para el cliente
                ok: true,
                count: products.length,
                countByCategory,
                products
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({ // Respuesta de error para el cliente
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error en su petición."
                }
            })
        }
    },
    detail: async (req, res) => {
        try {
            const product = await getProductById(req.params.id, req); // Esperando que la función se procese y responda
            return res.status(200).json({ // Respuesta de petición exitosa para el cliente
                ok: true,
                product
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({ // Respuesta de error para el cliente
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error en su petición."
                }
            })
        }
    },
    store: async (req, res) => {
        try {
            const newProduct = await storeProduct(req.body, req);
            const product = await getProductById(newProduct.id,req);
            
            return res.status(200).json({
                ok:true,
                data: product,
                meta:{
                    status:200,
                    total:1,
                    url:`/api/products/${newProduct.id}`,
                }
            })
        } catch (error) {
            return errorResponse(res,error)
        }
    },
    update : async (req,res) => {
        try {
            const {id} = req.params;
            await updateProduct(id,req);
            const product = await getProductById(id,req);

            return res.status(200).json({
                ok: true,
                data: product,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/products/${id}`
                }
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error"
                }
            })
        }
    },
    destroy: async (req,res) => {
        try {
            const {id} = req.params;
            await deleteProduct(id)

            return res.status(200).json({
                ok: true,
                data: `El producto ${id} ha sido eliminado`,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/users/${id}`
                }
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Hubo error'
                }
            })
        }
    }
}