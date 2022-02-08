const fs = require('fs');
const path = require('path');

// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');


const productController = {

    productos: (req,res) => {

        const productos = productModel.all();

        res.render('./products/productos' ,{productos})
    },

    viewCreate: (req,res)=>{

        let listProduct = productModel.all();
        res.render('./admin/admin', {listProduct})
    },

    createProduct:(req,res)=>{
        let value = {
        id: 0,
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description,
        price: Number(req.body.price),
        section: "productos",
        category: req.body.category
        }

        productModel.create(value);
        res.redirect('/viewCreate')
    },


    productEdition : (req,res)=>{
        let producto = productModel.find(req.params.id)
        res.render( './admin/productEdition', {producto})
    },

    edit : (req,res)=>{
        let product = productModel.find(req.params.id);

		let aCambiar = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file != null ? req.file.filename : product.image
        };
		productModel.update(aCambiar);
		res.redirect('/viewCreate');
    },

    delete : (req,res)=>{
        productModel.delete(req.params.id);
		res.redirect('/viewCreate');
    },
    
    productDetail: (req, res) => {
        const detail = productModel.find(req.params.id);

        res.render('./products/productDetail', {detail});
    },

    category: (req, res) => {

        const productos = productModel.productsCategory(req.params.categoria);
        const detail = productModel.find(req.params.id);

        res.render('./products/categories', {productos, detail})
    },
    search: (req, res) => {

        let busqueda = req.query.search.toLowerCase();
        // console.log("Estoy buscando:" + busqueda);

        let productos = productModel.readFile();

        let filtrados = productos.filter(e => e.title.toLowerCase().includes(busqueda) || e.category.toLowerCase().includes(busqueda));

        res.render('./menu/comidaReq', { filtrados: filtrados})
    },
    
    shoppingCart : (req,res)=>{
        res.render('./products/shopping-cart');
    }, 

}


module.exports = productController;