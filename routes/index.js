const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Hooray, port is working!');
  next(); 
});

router.get('/', function(req, res) {
  res.json({ message: 'Knock yourself off but dont drink and drive!' });   
});

router.use('/api', router);

module.exports = router;
