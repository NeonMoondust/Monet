// const model = require('../models/model.js');

async function admin_index(request, response){
    response.render('admin',{
        layout: 'admin',
    })
}

module.exports = {
    admin_index,
}