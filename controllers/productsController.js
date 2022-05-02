// const model = require('../models/model.js');

async function products_index(request, response){
    response.render("products", {
        layout: "products",
    });
}

module.exports = {
    products_index,
}