const { getAllProducts, getProductById } = require('../../services/productsServices');

module.exports = {
    index: async (req, res) => {
        try {
            const products = await getAllProducts(req); // Esperando que la función se procese y responda
            return res.status(200).json({ // Respuesta de petición exitosa para el cliente
                ok: true,
                count: products.length,
                countByCategory: {},
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
    }
}