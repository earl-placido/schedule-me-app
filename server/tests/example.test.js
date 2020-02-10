require('dotenv').config();
const mysql = require('promise-mysql');
const exampleModel = require('../api/model/exampleModel');

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
};

beforeAll(() => {
    console.log("This will run before the tests.");
    exampleModel.insertData(1, "test");
});

describe(`Example test`, () => {
    it(`This is a single test`, () => {
        exampleModel.getData(1).then(data => {
            expect(data).toBe("test");
        });
    });
});

afterAll(() => {
    console.log("This will run after the tests.");
});