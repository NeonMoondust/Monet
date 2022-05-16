
require('dotenv').config();
const fs = require('fs');

const { Client } = require('pg');

const migrate_data = async () => {
    const client = new Client();
    await client.connect();

    const sql = fs.readFileSync('./models/database/task.sql').toString();

    const res = await client.query(sql);
    await client.end();
    return res.rows;
};

migrate_data().then(()=> {
    return console.log("Los datos han sido migrados.");
}).catch((e)=> {
    console.log(`Hay un error en la migración de los datos. ${e}`);
    process.exit();
});