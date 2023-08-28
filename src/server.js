require("./config/db")
const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
const swaggerUI = require("swagger-ui-express");
const routes = require("./routes");
const docs = require('./docs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(routes);
app.use('/upload/images', express.static('/upload/images'));
app.use(express.static(path.join(__dirname, 'public')));
 
app.get("/", async (req,res)=>{
    res.sendFile(path.resolve('./src/index.html'))
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


module.exports = app; 