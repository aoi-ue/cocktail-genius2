const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose")
const Cocktail = require('../models/cocktail')
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
// const app = express();


async function addFakeCocktail() {
  const cocktail1 = new Cocktail ({
    name: "yy",
    description: "nice! nice!",
    ingredients: ["dda", 1000]
  });
  await cocktail1.save();
}

beforeAll(async () => {
  jest.setTimeout(100000);
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  const user1 = { username: "yuhan", password: "password" };
  await request(app)
    .post("/users/signup")
    .send(user1);
  let response = await request(app)
    .post("/users/signin")
    .send(user1);
  jwtTokenUser1 = response.body.token;
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

beforeEach(async () => {
  // mongoose.connection.db.dropDatabase();
  await addFakeCocktail();
});

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    message: "Knock yourself off but dont drink and drive!"
  });
});

test("POST /", async () => {
  const cocktail2 = {
    name: "xx",
    description: "nice!",
    ingredients: ["dda", 90]
  };

  const response = await request(app)
    .post("/cocktails")
    .send(cocktail2)
    .set("Authorization", "Bearer " + jwtTokenUser1);

  const cocktailModel = await Cocktail.find();

  expect(response.status).toEqual(200);
  expect(cocktailModel.length).toBe(3);
});
