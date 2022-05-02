// const model = require('../models/model.js');

async function dashboard_index(request, response){
    response.render("dashboard", {
        layout: "dashboard",
    });
}

module.exports = {
    dashboard_index,
}