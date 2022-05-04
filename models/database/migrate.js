const { Client } = require('pg');
const fs = require('fs');

require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const sql = fs.readFileSync('./models/database/data.sql').toString();

async function migrate(){
    console.log(process.env.DATABASE_URL);
    try{
        await client.connect();
        return (await client.query(sql)).rows;
    }catch(e){
        console.log('Algo paso en en el intento de Conexion -> ' + e);
    }finally{
        await client.end();
    }
}

migrate().then(()=> {
    return console.log("La DataBase ha sido creada.");
}).catch((e)=> {
    console.log(`Hay un error en la migración. ${e}`);
    process.exit();
});