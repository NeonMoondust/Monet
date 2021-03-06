const jwt = require("jsonwebtoken");
const fs = require('fs');
const axios = require('axios');
const env = process.env;
const model = require('../models/model');
const rol_translation = require('./helpers/rol_translation');
const {getRawProducts, updateProducts, insert_transferencia} = require('./helpers/product');

const key = env.TOKEN_PRIVATE_KEY;

async function dashboard_index(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.redirect('/login');
        const this_usuario = (await model.dataProvider({'verb': 'get',})).find(usuario => usuario.nombre === decoded.data.nombre);
        const products = await getRawProducts(model);
        response.render("dashboard", {
            layout: "dashboard",
            nombre: this_usuario.nombre,
            rol: rol_translation(this_usuario.rol),
            products: products,
        });
    });
}

async function dashboard_verify(request, response, next){
    let cookies = request.headers.cookie;
    cookies = cookies.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    if(typeof cookies.jwt_token !== 'undefined'){
        request.token = cookies.jwt_token;
        next();
    }
}

async function dashboard_addProduct(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {products_toAdd} = request.body;
        const raw_products = await getRawProducts(model);
        for (const product of products_toAdd) {
            const to_add = raw_products.find(raw_product => raw_product.id === product.product_id);
            if(!to_add) return response.sendStatus(400);
            // to_add.stock = ((to_add.stock - product.quantity) < 0 ? 0 : to_add.stock - product.quantity);
            to_add.stock = to_add.stock + product.quantity;
            await updateProducts(model, to_add);
        }
        response.sendStatus(200);
    });
}

async function dashboard_decreaseProduct(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {products_toDecrease} = request.body;
        const raw_products = await getRawProducts(model);
        for (const product of products_toDecrease) {
            const to_decrease = raw_products.find(raw_product => raw_product.id === product.product_id);
            if(!to_decrease) return response.sendStatus(400);
            to_decrease.stock = ((to_decrease.stock - product.quantity) < 0 ? 0 : to_decrease.stock - product.quantity);
            await updateProducts(model, to_decrease);
        }
        response.sendStatus(200);
    });
}

async function dashboard_transferencia(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {cantidad,id_producto,es_abono,esta_pagado} = request.body;
        await insert_transferencia(model, {cantidad: cantidad, id_producto:id_producto, es_abono, esta_pagado})
        response.sendStatus(200);
    });
}

module.exports = {
    dashboard_index,
    dashboard_verify,
    dashboard_addProduct,
    dashboard_decreaseProduct,
    dashboard_transferencia,
}