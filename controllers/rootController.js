// const model = require('../models/model.js');

async function root_index(request, response){
    response.render("index", {
        layout: "index",
    });
}

module.exports = {
    root_index,
}