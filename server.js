const app = require("./app");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Magic happens on port ${server.address().port}...`);
});
