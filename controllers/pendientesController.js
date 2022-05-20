const jwt = require("jsonwebtoken");
const env = process.env;
const model = require('../models/model');
const rol_translation = require('./helpers/rol_translation');
const {getRawProducts, updateProducts} = require('./helpers/product');
const {getPendingProducts, finishPendingProduct, cancelPendingProduct} = require('./helpers/transferencias');

const key = env.TOKEN_PRIVATE_KEY;

async function pendientes_index(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.redirect('/login');
        const this_usuario = (await model.dataProvider({'verb': 'get',})).find(usuario => usuario.nombre === decoded.data.nombre);
        const products = await getRawProducts(model);
        let transferencias = await getPendingProducts(model);
        const option = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"2-digit", second:"2-digit"};
        transferencias = transferencias.map(transferencia => {
            transferencia.fecha_creacion = (new Date(transferencia.fecha_creacion)).toLocaleDateString('es-US', option);
            return transferencia;
        });
        response.render("pendientes", {
            layout: "pendientes",
            nombre: this_usuario.nombre,
            rol: rol_translation(this_usuario.rol),
            to_change_products: products,
            pending_product: transferencias,
        });
    });
}

async function pendientes_verify(request, response, next){
    let cookies = request.headers.cookie;
    cookies = cookies.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    if(typeof cookies.jwt_token !== 'undefined'){
        request.token = cookies.jwt_token;
        next();
    }
}

async function pendientes_finish(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {id} = request.body;
        await finishPendingProduct(model, id);
        response.sendStatus(200);
    });
}
async function pendientes_cancel(request, response){
    jwt.verify(request.token, key, async (err, decoded) => {
        if(err || !decoded) return response.sendStatus(403);
        const {id} = request.body;
        await cancelPendingProduct(model, id);
        response.sendStatus(200);
    });
}

module.exports = {
    pendientes_index,
    pendientes_verify,
    pendientes_finish,
    pendientes_cancel,
}