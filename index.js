const SERVER_NAME = "products-api";
const PORT = 5000;
const HOST = "127.0.0.1";

let errors = require("restify-errors");
let restify = require("restify"),
  productsSave = require("save")("products"),
  server = restify.createServer({ name: SERVER_NAME });

server.listen(PORT, HOST, function () {
  console.log("Server is listening at %s", server.name, server.url);
});
