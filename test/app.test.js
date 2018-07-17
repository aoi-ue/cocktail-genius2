const request = require ('supertest')
const app = require ('../src/app')
test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Hello! Welcome to Cocktail API");
});

test("GET /", async () => {
  const response = await request(app).get("/cocktails/Gin");
  expect(response.body.strIngredient1).toEqual("Gin");
});
