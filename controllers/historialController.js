// const model = require('../models/model.js');

async function historial_index(request, response){
    response.render("historial", {
        layout: "historial",
    });
}

module.exports = {
    historial_index,
}