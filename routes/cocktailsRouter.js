const express = require("express");
const Cocktail = require("../models/cocktail");
const publicRoute = express.Router();
const restrictedRoute = express.Router();
const authenticateUser = require("../utils/auth");

publicRoute.use(express.json());

publicRoute.get("/", async (req, res, next) => {
  const cocktails = await Cocktail.find();
  res.json(cocktails);
});

publicRoute.get("/search", async (req, res) => {
  var cocktails = await Cocktail.find({ name: req.query.name });
  res.json(cocktails);
});

publicRoute.use(function(req, res, next) {
  res.status(404).send({ Message: "Cocktail Unavailable!" });
});

restrictedRoute.post("/", async (req, res) => {
  const cocktail = await new Cocktail();
  cocktail.name = req.body.name;
  cocktail.save(function(err) {
    if (err) res.send(err);
    res.json({ message: "Cocktail created!" });
  });
});

restrictedRoute.put("/:id", async (req, res, next) => {
  const update = await Cocktail.findByIdAndUpdate(req.params.id, req.body);
  res.status(204).json();
});

restrictedRoute.delete("/:id", async (req, res, next) => {
  const update = await Cocktail.findByIdAndDelete(req.params.id, req.body);
  res.status(204).json();
});

module.exports = app => {
  app.use("/cocktails", authenticateUser, restrictedRoute);
  app.use("/cocktails", publicRoute);
};
