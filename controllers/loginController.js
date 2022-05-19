const model = require('../models/model');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const env = process.env;


const key = env.TOKEN_PRIVATE_KEY;

function login_index(request, response){
    response.render('login',{
        layout: 'login'
    })
}

async function login_signin(request, response){
    const {body} = request.body;
    const users_data = await model.dataProvider({
        'verb': 'get',
    })
    const auth = users_data.find(user => user.nombre == body.username && user.password == body.password);

    if(auth){
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000) + 60,
            data: auth
        }, key);
        response.send(token);
    }else{
        response.end();
    }
}

module.exports = {
    login_index,
    login_signin,
};