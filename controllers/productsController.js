const jwt = require("jsonwebtoken");
const fs = require('fs');
const axios = require('axios');
const env = process.env;
const model = require('../models/model');
const rol_translation = require('./helpers/rol_translation');
const {getRawProducts, updateProducts, createProduct, editProduct} = require('./helpers/product');

const key = env.TOKEN_PRIVATE_KEY;

async function products_index(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.redirect('/login');
        const this_usuario = (await model.dataProvider({'verb': 'get',})).find(usuario => usuario.nombre === decoded.data.nombre);
        const products = await getRawProducts(model);
        response.render("products", {
            layout: "products",
            nombre: this_usuario.nombre,
            rol: rol_translation(this_usuario.rol),
            products: products,
        });
    });
}

async function products_verify(request, response, next){
    let cookies = request.headers.cookie;
    cookies = cookies.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    if(typeof cookies.jwt_token !== 'undefined'){
        request.token = cookies.jwt_token;
        next();
    }
}

async function products_crear(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {id, nombre, stock} = request.body;
        const this_usuario = (await model.dataProvider({'verb': 'get',})).find(usuario => usuario.nombre === decoded.data.nombre);
        const products = await getRawProducts(model);
        await createProduct(model, {product_id: +products[products.length-1].id + 1, nombre: nombre, stock: stock, user_id: this_usuario.id});
        response.sendStatus(200);
    });
}

async function products_editar(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {id, nombre, stock} = request.body;
        await editProduct(model, {product_id: id, nombre: nombre, stock: stock});
        response.sendStatus(200);
    });
}

module.exports = {
    products_index,
    products_verify,
    products_crear,
    products_editar,
}