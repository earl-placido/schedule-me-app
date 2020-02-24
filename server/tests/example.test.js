require('dotenv').config();
const exampleModel = require('../api/model/exampleModel');

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