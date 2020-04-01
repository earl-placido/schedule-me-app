require("dotenv").config();

// import node modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const expressServerUtils = require("express-server-utils");

// json for defining our Swagger page
const swaggerDocument = require("./swagger.json");

// import server code & configs
const api = require("./api/api");

const app = initApp();

function initApp() {
  let app = express();

  app.use(
    cors({
      origin: true,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      exposedHeaders: ["x-auth-token"]
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api", swaggerUi.serve);
  app.get("/api", swaggerUi.setup(swaggerDocument));
  app.use("/api/v1", api);

  return app;
}

function initServer(app, port) {
  let server = expressServerUtils(http.createServer(app), port);

  server.listen();
  server.handleOnError();
  server.handleOnListening();
  
  return server;
}

module.exports = initServer(app, process.env.SERVER_PORT || 8000);
