const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require ('../swagger.json')
const ingredient = require ('../ingredient.json')

app.use(express.json()); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res, next) => {
  res.json("Hello! Welcome to Cocktail API");
});

app.get("/cocktails", (req, res) => {
  res.json(ingredient);
});

app.get("/cocktails/:strIngredient1", (req, res, next) => {
  const foundDrinks = (ingredient.find(drink => drink.strIngredient1 === req.params.strIngredient1));
  console.log(foundDrinks)
  if (!foundDrinks){ 
    next('err'); 
  }
  else {
    res.json(foundDrinks)
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({Message: 'Ingredient Unavailable!'})
})



module.exports = app