"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionDB = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    database: 'yavidrive',
    user: 'postgres',
    password: '1234',
});
connectionDB.connect();
console.log('conexión exitosa');
exports.default = connectionDB;
