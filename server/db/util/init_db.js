//load environment variables
require('dotenv').config();
require('require-sql');

const mysql = require('promise-mysql');
const schemaFile = require('../schema.sql');

const DB_VARIABLES = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    rootUser: process.env.MYSQL_ROOT_USER,
    rootPassword: process.env.MYSQL_ROOT_PASSWORD
}
console.log(DB_VARIABLES);

console.log('Initializing Database');

mysql.createConnection({
    host: DB_VARIABLES.host,
    user: DB_VARIABLES.rootUser,
    password: DB_VARIABLES.rootPassword
}).then(conn => {
    console.log("Connected to MySQL");
    let response = conn.query(`CREATE DATABASE IF NOT EXISTS ??`, [DB_VARIABLES.database]);
    conn.end();
    return response;
}).then(() => {
    console.log(`Created database ${DB_VARIABLES.database}`);
    return mysql.createConnection({
        host: DB_VARIABLES.host,
        user: DB_VARIABLES.rootUser,
        password: DB_VARIABLES.rootPassword,
        database: DB_VARIABLES.database,
        multipleStatements: true
    });
}).then(conn => {
    console.log(`Connected to database ${DB_VARIABLES.database}`);
    let response = conn.query(`
        CREATE USER IF NOT EXISTS ??@${mysql.escapeId(DB_VARIABLES.host, true)} IDENTIFIED BY ?;
        GRANT ALL ON *.* TO ??@${mysql.escapeId(DB_VARIABLES.host, true)};
        flush privileges;
    `, [DB_VARIABLES.user, DB_VARIABLES.password, DB_VARIABLES.user] );
    conn.end();
    return response;
})
.then(() => {
    console.log(`Created user: ${DB_VARIABLES.user}`);
    return mysql.createConnection({
        host: DB_VARIABLES.host,
        user: DB_VARIABLES.user,
        password: DB_VARIABLES.password,
        database: DB_VARIABLES.database,
        multipleStatements: true
    });
}).then(conn => {
    console.log("Creating database schema");
    let response = conn.query(schemaFile);
    conn.end();
    return response;
}).catch(err => {
    console.error(err.message);
});