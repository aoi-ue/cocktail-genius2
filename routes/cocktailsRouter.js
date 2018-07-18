const express = require("express");
const Cocktail = require('../models/cocktail')
const router = express.Router();

router.use(express.json()); 

router.get("/", async (req, res, next) => {
  const cocktails = await Cocktail.find()
  res.json(cocktails);
});

router.use(function (req, res, next) {
  res.status(404).send({Message: 'Cocktail Unavailable!'})
})


module.exports = router