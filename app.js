const { Client } = require('pg');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const pool = new Client({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true
});

async function getPgVersion() {
    const client =  pool.connect().then(()=>{
        console.log('connected db on port 5432');
    }).catch((err)=>{
        console.log(err);
    })
}

getPgVersion();