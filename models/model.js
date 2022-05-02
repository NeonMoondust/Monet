/*

!!!!!CLIENT DISPENSER ->

RELEASE NEEDS TO BE CHECK AND INCLUDES ON DATAPROVIDER
IN ORDER TO HAVE A CICLE OF AVAILABLE CLIENTS.

*/

const {Pool, Client} = require('pg');
const fs = require('fs');
require('dotenv').config();

const { prepared_statement } = JSON.parse(fs.readFileSync('./models/prepared_statement.json'));

const PSQL_CONFIG = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

let pool;
let client = [], available_clients = [];
let client_id = 0;

async function dataProvider(request){
    let data = [];
    const this_client = await getClient();
    switch(request.verb){
        case 'get':
            // data = (await this_client.query(prepared_statement.example.get)).rows;
            break;
        case 'post':
            // prepared_statement.example.post.values = request.values;
            // data = (await this_client.query(prepared_statement.example.post)).rows;
            break;
        case 'put':
            // prepared_statement.example.put.values = request.values;
            // data = (await this_client.query(prepared_statement.example.put)).rows;
            break;
        case 'delete':
            // prepared_statement.example.delete.values = request.values;
            // data = (await this_client.query(prepared_statement.example.delete)).rows;
            break;
        case 'state':
            // prepared_statement.example.state.values = request.values;
            // data = (await this_client.query(prepared_statement.example.state)).rows;
        default:
            break;
    }
    return data;
}

async function getClient(){
    pool = new Pool(PSQL_CONFIG);
    let current_client;
    try{
        current_client = await createClient();
        return current_client;
    }catch(e){
        return console.error(`Ha habido un error de conexion con el codigo: ${e.code}.\nFavor revisar los datos de autenticacion y volver a intentarlo.`);
    }
}

//#region Client dispenser

async function createClient(){
    let new_client = await pool.connect();
    if(available_clients.length > 0){
        client[available_clients[0]] = new_client;
        return client[available_clients.shift()];
    }
    client.push(new_client);
    return client[client_id++];
}

async function releaseClient(current_client){
    client[current_client].release();
    available_clients.push(current_client);
}
//#endregion

module.exports = {
    dataProvider,
}