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
app.get("/", async (req,res)=>{
    res.send("<h1 style='text-align:center;padding-top:50px'>Welcome to Ilove server</h1>")
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


module.exports = app; 