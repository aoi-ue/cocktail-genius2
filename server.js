const app = require("./app");
const mongoose = require ('mongoose')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cocktails_local");
const db = mongoose.connection;
db.on("error", error => {
  console.error("connection error:", error);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Magic happens on port ${server.address().port}...`);
});
