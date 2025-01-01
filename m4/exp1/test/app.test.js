const supertest = require("supertest");
const app = require("../app");

describe("test the get endpoint of /add", () => {
    // generate two random numbers that we will use as request parameters when calling the calculator endpoints
    // let num1 = Math.floor(Math.random() * 1_000_000);
    // let num2 = Math.floor(Math.random() * 1_000_000);
    let num1 = 2;
    let num2 = 3;

    test("calling /add to add number", () => {
        return supertest(app)
            .get(`/calculator/add?num1=${num1}&num2=${num2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(`${num1 + num2}`);
            });
    });
});

describe("test the get endpoint of /subtract", () => {
    let num1 = 7;
    let num2 = 4;

    test("calling /subtract to minus number", () => {
        return supertest(app)
            .get(`/calculator/subtract?num1=${num1}&num2=${num2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(`${num1 - num2}`);
            });
    });
});



describe("test the get endpoint of /divide", () => {
    let num1 = 36;
    let num2 = 9;

    test("calling /divide to divide numbers", () => {
        return supertest(app)
            .get(`/calculator/divide?num1=${num1}&num2=${num2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(`${(num1 / num2).toFixed(2)}`);
            });
    });

    test("calling /divide with division by zero", () => {
        return supertest(app)
            .get(`/calculator/divide?num1=${num1}&num2=0`)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual({
                    error: 'The input number cannot be zero',
                });
            });
    });
});

// describe.only("test the get endpoint of /multiply", () => {
describe("test the get endpoint of /multiply", () => {
    let num1 = 9;
    let num2 = 5;

    test("calling /multiply to multiply number", () => {
        return supertest(app)
            .get(`/calculator/multiply?num1=${num1}&num2=${num2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(`${num1 * num2}`);
            });
    });

    test("testing error case /multiply for invalid number", () => {
        return supertest(app)
            .get(`/calculator/multiply?num1=tes&num2=${num2}`)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual({
                    error: 'The inputs are not correct numbers',
                });
            });
    });
});