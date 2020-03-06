//load environment variables
require("dotenv").config()
require("require-sql")

const mysql = require("promise-mysql")
const schemaFile = require("../schema.sql");

const DB_VARIABLES = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  rootUser: process.env.RDS_USERNAME,
  rootPassword: process.env.RDS_PASSWORD
};

console.log("Initializing Database");

mysql
  .createConnection({
    host: DB_VARIABLES.host,
    port: DB_VARIABLES.port,
    user: DB_VARIABLES.rootUser,
    password: DB_VARIABLES.rootPassword
  })
  .then(conn => {
    console.log("Connected to MySQL");
    let response = conn.query(`CREATE DATABASE IF NOT EXISTS ??`, [
      DB_VARIABLES.database
    ]);
    conn.end();
    return response;
  })
  .then(() => {
    console.log(`Created database ${DB_VARIABLES.database}`);
    return mysql.createConnection({
      host: DB_VARIABLES.host,
      port: DB_VARIABLES.port,
      user: DB_VARIABLES.rootUser,
      password: DB_VARIABLES.rootPassword,
      database: DB_VARIABLES.database,
      multipleStatements: true
    });
  })
  .then(conn => {
    console.log(`Connected to database ${DB_VARIABLES.database}`);
    // GRANT ALL PRIVILEGES doesn't work so I just listened all of them except SUPER
    const query = mysql.format(
      `
        CREATE USER IF NOT EXISTS ??@'%' IDENTIFIED BY ?;
        GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, PROCESS, REFERENCES, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER ON *.* TO ??@'%';
        flush privileges;
    `,
      [DB_VARIABLES.user, DB_VARIABLES.password, DB_VARIABLES.user]
    );

    let response = conn.query(query);
    conn.end();
    return response;
  })
  .then(() => {
    console.log(`Created user: ${DB_VARIABLES.user}`);
    return mysql.createConnection({
      host: DB_VARIABLES.host,
      port: DB_VARIABLES.port,
      user: DB_VARIABLES.user,
      password: DB_VARIABLES.password,
      database: DB_VARIABLES.database,
      multipleStatements: true
    });
  })
  .then(conn => {
    console.log("Creating database schema");
    let response = conn.query(schemaFile);
    conn.end();
    return response;
  })
  .catch(err => {
    console.error(err.message);
  });
