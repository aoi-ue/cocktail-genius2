const request = require ('supertest')
const app = require ('../app')
test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Hello! Welcome to Cocktail API");
});