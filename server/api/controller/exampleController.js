const mysql = require("promise-mysql");

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

function insertData(id, data) {
    return mysql.createConnection(MYSQLDB).then(conn => {
        const result = conn.query(
            `
                INSERT INTO Example (ExampleID, ExampleData)
                VALUES (?, ?) 
                ON DUPLICATE KEY UPDATE ExampleData = ?;
            `,
            [id, data, data]
        );
        conn.end();
        return result;
    });
}

function getData(id) {
    return mysql.createConnection(MYSQLDB).then(conn => {
        const data = conn.query(
            `
                SELECT ExampleData
                FROM Example
                WHERE ExampleID = ?
            `,
            [id]
        );
        conn.end();
        return data;
    });
}


module.exports = {
   insertData,
   getData
}