const mongoose = require("mongoose");

//Schema
const cocktailSchema = mongoose.Schema({
    name: String, 
    description: String, 
    ingredients: Array 
}); 

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail
    