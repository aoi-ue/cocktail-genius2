const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/jumpstart')

const db = mongoose.connection
db.on('error', error => {
    console.error('An error occurred!', error)
})

db.once('open', async () => {
    // Schema
    const IngredientSchema = mongoose.Schema({
        ingrendients: Array 
    })

    // const cocktailSchema = mongoose.Schema({
    //     strIngredient1: String, 
    //     strDrink: String, 
    // })

    // Model
    const List = mongoose.model('Cocktail', IngredientSchema)

    // Insert data
    const bloodyMary = new List({
        ingrendients: ["Vodka", "lemon"]
    })

    // const pepperoni = new Pizza({
    //     name: 'pepperoni'
    // })

    bloodyMary.save()
    // pepperoni.save()

    const ingrendient = await List.find()
    console.log(ingrendient)
})