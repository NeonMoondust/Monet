// const model = require('../models/model');
const jwt = require("jsonwebtoken");
const fs = require('fs');

const {key} = JSON.parse(fs.readFileSync('./misc/jwt_secretKey.json'));

function login_index(request, response){
    response.render('login',{
        layout: 'login'
    })
}

async function login_loginIn(request, response){
    const {username, password} = request.query;
    // if(username == 'admin' && password == 'admin') return response.redirect('/admin');
    // const users_data = await model.dataProvider({
    //     'verb': 'get',
    // })
    // const auth = users_data.find(user => user.username == username && user.password == password);

    if(auth){
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000) + 60,
            data: auth
        }, key);
        response.redirect(`/datos?token=${token}`);
    }else{
        response.redirect('/login');
    }
}

module.exports = {
    login_index,
    login_loginIn,
};