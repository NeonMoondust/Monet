const express = require('express');
const expressFileUpload = require('express-fileupload');
const hbs = require('express-handlebars');

const root_route = require('./routes/rootRoute.js');
const login_route = require('./routes/loginRoute.js');
const dashboard_route = require('./routes/dashboardRoute.js');
const pendientes_route = require('./routes/pendientesRoute.js');
const products_route = require('./routes/productsRoute.js');
const admin_route = require('./routes/adminRoute.js');
const usuarios_route = require('./routes/usuariosRoute.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {console.log(`Listening PORT: ${PORT}.`)});

app.use(expressFileUpload({
    limits: {fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: 'El tamaño del archivo es demasiado grande',
}))

//#region Routes
app.use('/', root_route);
app.use('/login', login_route);
app.use('/dashboard', dashboard_route);
app.use('/pendientes', pendientes_route);
app.use('/products', products_route);
app.use('/admin', admin_route);
app.use('/usuarios', usuarios_route);
//#endregion

//#region View Engine Misc -------
app.use(express.static('public'));

app.set("view engine", ".hbs");

app.engine("hbs", hbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials/",
    extname: ".hbs",
}));
// #endregion

//#region Wildcard routes
app.get('*', (request, response) =>{
    response.render('404',{
        layout: '404',
    });
});
//#endregion