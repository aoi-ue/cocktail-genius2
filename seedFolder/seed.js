var seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cocktails_local",
  function() {
    // Load Mongoose models
    seeder.loadModels(["models/cocktail.js"]);

    // Clear specified collections
    seeder.clearModels(["Cocktail"], function() {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    });
  }
);

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "Cocktail",
    documents: [
      {
       name: 'gin tonic',
       description: 'blah bla',
       ingredients: [{
         name:"gin", 
         quantityInL: 0.01 
       },
       {
        name:"tonic", 
        quantityInL: 0.5 
      }]
      }, 
      {
        name: 'bloody mary',
        description: 'blah bla',
        ingredients: [{
          name:"vodka", 
          quantityInL: 0.01 
        },
        {
         name:"tomato juice", 
         quantityInL: 0.5 
       }]
       },
       {
        name: 'white russian',
        description: 'blah bla',
        ingredients: [{
          name:"vodka", 
          quantityInL: 0.01 
        },
        {
         name:"coffee", 
         quantityInL: 0.5 
       }]
       }
    ]
  }
];
