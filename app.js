const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require ('./swagger.json')

const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const cocktailsRouter = require("./routes/cocktailsRouter");
const userRouter = require("./routes/userRouter")

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/cocktails", cocktailsRouter);
app.use("/users" , userRouter)



module.exports = app;
