const express = require("express");
const Cocktail = require("../models/cocktail");
const passport = require("passport");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
  const cocktails = await Cocktail.find();
  res.json(cocktails);
});

router.get("/search", async (req, res) => {
  var cocktails = await Cocktail.find({ name: req.query.name });
  res.json(cocktails);
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const cocktail = await new Cocktail();
    cocktail.name = req.body.name;
    cocktail.save(function(err) {
      if (err) res.send(err);
      res.json({ message: "Cocktail created!" });
    });
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    passport.authenticate("jwt", { session: false });
    const update = await Cocktail.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json();
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    passport.authenticate("jwt", { session: false });
    const update = await Cocktail.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json();
  }
);

router.use(function(req, res, next) {
  res.status(404).send({ Message: "Cocktail Unavailable!" });
});

module.exports = router;
