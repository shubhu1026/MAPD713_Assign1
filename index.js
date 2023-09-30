// Server constants
const SERVER_NAME = "products-api";
const PORT = 5000;
const HOST = "127.0.0.1";

let errors = require("restify-errors");
let restify = require("restify"),
  productsSave = require("save")("products"),
  server = restify.createServer({ name: SERVER_NAME });

// Set the server to listen at localhost port 5000
server.listen(PORT, HOST, function () {
  console.log("Server is listening at %s", server.name, server.url);
});

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

//--------------------------------------------------------------------------------//
// GET REQUEST
//--------------------------------------------------------------------------------//
server.get("/products", function (req, res, next) {
  console.log("products GET: received request");

  // Find all the products within the given collection
  productsSave.find({}, function (error, products) {
    // Return all of the products in the system
    console.log("products GET: sending response");
    res.send(products);
  });
});
