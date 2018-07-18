const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json("Hello! Welcome to Cocktail API");
});  

module.exports = router;
