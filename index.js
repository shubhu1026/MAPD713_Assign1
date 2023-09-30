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

// Counter variables for GET and POST requests\
let getCount = 0;
let postCount = 0;

//--------------------------------------------------------------------------------//
// GET REQUEST
//--------------------------------------------------------------------------------//
server.get("/products", function (req, res, next) {
  console.log("products GET: received request");

  // Find all the products within the given collection
  productsSave.find({}, function (error, products) {
    // Return all of the products in the system
    getCount++;
    console.log("products GET: sending response");
    console.log(
      "Processed Request Count--> Get:" + getCount + ", Post:" + postCount
    );
    res.send(products);
  });
});
