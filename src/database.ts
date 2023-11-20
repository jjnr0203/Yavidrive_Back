import { Pool } from "pg";

const connectionDB = new Pool({
    host: 'localhost', 
    port: 5432, 
    database: 'yavidrive',
    user: 'postgres',
    password: '1234',
})

connectionDB.connect();
console.log('conexión exitosa')
export default connectionDB;