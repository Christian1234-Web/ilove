require("./config/db")
const express = require("express");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const routes = require("./routes");
const docs = require('./docs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


module.exports = app; 