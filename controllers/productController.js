const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    index : (req,res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("list",{
            products,
            toThousand
        })
    },
    detail: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const {id}= req.params
        const productDetails = products.find(product => product.id === +id);
        return res.render('productdetail', {
            title: "Detalle del producto",
            ...productDetails,
        })
    },

    shoppingcart: (req, res) => {
        return res.render('shoppingcart', {
            title: "Carrito de compras"
        })

    },
    addproduct: (req, res) => {
        return res.render('addproduct', {
            title: "Agregar producto"
        })
    },
    editproduct: (req, res) => {
        const { id } = req.params;
    	const product = products.find(product => product.id === +id);
		res.render("editproduct",{
			...product,
            title: "Editar Producto"
		})
    },
    store: (req, res) => {
        const {name, price, discount, description, section, categoría, marca } = req.body;

        const newproduct ={
            id: products[products.length -1].id +1,
           name:name,
            price: +price,
            discount: +discount,
            description: description,
            marca,
            categoría,
            section,
            imagen:null
        }
        /*return res.send(newproduct)*/
      products.push(newproduct);

        fs.writeFileSync('./data/products.json',JSON.stringify(products, null, 3),'utf-8')
    
        return res.redirect('/products/list');
    },
    update: (req,res)=>{
        const {id}= req.params
		const product = products.find(product => product.id === +id);
    	const {nombre,precio,descuento,categoria,descripcion,stock,marca,material} = req.body

        const productModified = {
			id : +id,
			nombre: nombre.trim(),
			precio: +precio,
			descuento: +descuento,
			categoria: categoria,
			descripcion: descripcion.trim(),
			imagen: product.imagen,
            stock: +stock,
            marca: marca,
            material: material
		}

        const productosActualizados = products.map(product =>{
			if(product.id === +id ){
			  return productModified
			}
			return product
		  })
		  fs.writeFileSync('./data/products.json',JSON.stringify(productosActualizados, null, 3), 'utf-8')

		//   return res.send(req.body)
		  return res.redirect(`/products/detail/${id}`)
    },
    destroy : (req, res) => {

		const {id} = req.params;
		const productModified = products.filter(product => product.id !== +id)
		fs.writeFileSync(productsFilePath, JSON.stringify(productModified, null, 3), 'utf-8');
		res.redirect('/products')
}
}