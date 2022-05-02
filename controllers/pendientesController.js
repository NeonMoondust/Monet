// const model = require('../models/model.js');

async function pendientes_index(request, response){
    response.render("pendientes", {
        layout: "pendientes",
    });
}

module.exports = {
    pendientes_index,
}