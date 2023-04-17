const fs = require('fs');
const path = require('path');

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    list : (req,res) => {
        
        const products = db.Product.findAll({
            include: ["category"]
        });
        const categories =  db.Category.findAll();

        Promise.all([products,categories])
        .then(([products,categories]) =>{
            // return res.send(categories)

            return res.render("list", {
                title: "Todos Los productos",
                products,
                categories,
                toThousand
            })
        })
        .catch(error=>console.log(error))
        
        
    },
    category:(req,res)=>{

        const {idCategory} = req.params;
    
        const products = db.Product.findAll({
            include: ["category"],
            where: {
                categoryId:idCategory
            }
        })
        const categories =  db.Category.findAll();

        Promise.all([products,categories])
        .then(([products,categories]) =>{
            // return res.send(products)
            return res.render("list",{
                title: idCategory ? products[0].category.name : "Todos los productos",
                products,
                categories,
                toThousand
            })
        })
        .catch(error=>console.log(error))
        
    },
    detail: (req, res) => {
        const {id}= req.params
        const product = db.Product.findByPk(id,{
            include:["brand","category","material","images"]
        })
        const categories =  db.Category.findAll();
        const images =  db.Image.findAll({
            where:{
                productId: id
            }
        });
        Promise.all([product,categories,images])
        .then(([product,categories,images]) =>{
            // return res.send(images)
            return res.render("productdetail",{
                title:"Detalle",
                ...product.dataValues,
                categories,
                images,
                toThousand
            })
        })
        .catch(error=>console.log(error))
        
    },

    shoppingcart: (req, res) => {
        db.Category.findAll()
        .then(categories=>{
            return res.render('shoppingcart', {
                categories,
                title: "Carrito de compras"
            })
        })
        .catch(error=>console.log(error))
    },

    addproduct: (req, res) => {
        db.Category.findAll()
        .then(categories=>{
            return res.render('addproduct', {
                categories,
                title: "Agregar producto"
            })
        })
        .catch(error=>console.log(error))
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
    editproduct: (req, res) => {
        const { id } = req.params;
    	const product = products.find(product => product.id === +id);
		res.render("editproduct",{
            ...product,
            categories,
            title: "Editar Producto"
		})
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