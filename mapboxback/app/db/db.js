
const Pool= require('pg').Pool;
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5067',
    port:5432
})


