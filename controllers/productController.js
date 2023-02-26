const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categoriesFilePath = path.join(__dirname, '../data/category.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    index : (req,res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        res.render("list",{
            products,
            titulo: "Todos Los productos",
            categories,
            toThousand
        })
    },
    category:(req,res)=>{
    const productsFilePath = path.join(__dirname, '../data/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
    const {idCategory} = req.params;
    const productsFilter = products.filter(product => product.category === idCategory);

    return res.render('list',{
        products: productsFilter,
        titulo: `Categoria de ${idCategory}`,
        categories,
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
            categories,
            toThousand
        })
    },

    shoppingcart: (req, res) => {
        return res.render('shoppingcart', {
            categories,
            title: "Carrito de compras"
        })

    },
    addproduct: (req, res) => {
        return res.render('addproduct', {
            categories,
            title: "Agregar producto"
        })
    },
    editproduct: (req, res) => {
        const { id } = req.params;
    	const product = products.find(product => product.id === +id);
		res.render("editproduct",{
			...product,
            categories,
            title: "Editar Producto"
		})
    },
    store: (req, res) => {
        const {name, price, discount, description, material, category, brand } = req.body;

        const newproduct ={
            id: products[products.length -1].id +1,
            name:name,
            price: +price,
            discount: +discount,
            description: description,
            brand,
            category,
            material,
            image:null
        }
        /*return res.send(newproduct)*/
      products.push(newproduct);

        fs.writeFileSync('./data/products.json',JSON.stringify(products, null, 3),'utf-8')
    
        return res.redirect('/products');
    },
    update: (req,res)=>{
        const {id}= req.params
		const product = products.find(product => product.id === +id);
    	const {name,price,discount,category,description,stock,brand,material} = req.body

        const productModified = {
			id : +id,
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

        const productosActualizados = products.map(product =>{
			if(product.id === +id ){
			  return productModified
			}
			return product
		  })
		  fs.writeFileSync('./data/products.json',JSON.stringify(productosActualizados, null, 3), 'utf-8')

		  return res.redirect(`/products/detail/${id}`)
    },
    destroy : (req, res) => {

		const {id} = req.params;
		const productModified = products.filter(product => product.id !== +id)
		fs.writeFileSync(productsFilePath, JSON.stringify(productModified, null, 3), 'utf-8');
		res.redirect('/products')
}
}