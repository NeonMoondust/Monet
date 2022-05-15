
require('dotenv').config();
const fs = require('fs');

const { Client } = require('pg');

const migrate = async () => {
    const client = new Client();
    await client.connect();

    const sql = fs.readFileSync('./models/database/data.sql').toString();

    const res = await client.query(sql);
    await client.end();
    return res.rows;
};

migrate().then(()=> {
    return console.log("La DataBase ha sido creada.");
}).catch((e)=> {
    console.log(`Hay un error en la migración. ${e}`);
    process.exit();
});