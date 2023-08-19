require("./config/db")
const express = require("express");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express");
const routes = require("./routes");
const docs = require('./docs');

const app = express();

//swagger
// const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "Arif Books Express API with Swagger",
//         version: "0.1.0",
//         description:
//           "This is a simple Book API application made with Express and documented with Swagger",
//         license: {
//           name: "MIT",
//           url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//           name: "skills with arif",
//           url: "arif.com",
//           email: "info@email.com",
//         },
//       },
//       servers: [
//         {
//           url: "http://localhost:8080/",
//         },
//       ],
//     },
//     apis: ["./domains/wallet/model.js", "./domains/wallet/routes.js"],
//   };
// const specs = swaggerJsdoc(options);

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs)
// ); 
// middleware
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


module.exports = app; 