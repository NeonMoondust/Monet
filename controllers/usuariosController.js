// const model = require('../models/model.js');

async function usuarios_index(request, response){
    response.render("usuarios", {
        layout: "usuarios",
    });
}

module.exports = {
    usuarios_index,
}