const request = require("supertest");
const app = require("../index");

describe("FAQ API Tests", () => {
  it("should fetch the faq in Bangaladeshi", async function () {
  const { expect } = await import("chai");
  request(app)
    .get("/api/getfaq?lang=bn")
    .end((err, res) => {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Welcome to the FAQ API");
      done();
    });
});

it("should create a new faq", async function () {
  const { expect } = await import("chai");
  request(app)
    .post("/api/createfaq")
    .send({
      question: "What is your name?",
      answer: "My name is John Doe",
    })
    .end((err, res) => {
      if (err) done(err);
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.data.question).to.equal("What is your name?");
      expect(res.body.data.answer).to.equal("My name is John Doe");
      done();
    });
});


});
