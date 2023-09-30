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
// GET REQUEST (All Products)
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

//--------------------------------------------------------------------------------//
// GET REQUEST (A single product with its id)
//--------------------------------------------------------------------------------//
server.get("/products/:id", function (req, res, next) {
  console.log("products GET: received request");

  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)));

    if (product) {
      // Send the product if no issues

      getCount++;
      console.log("products GET: sending response");
      console.log(
        "Processed Request Count--> Get:" + getCount + ", Post:" + postCount
      );

      res.send(product);
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404);
    }
  });
});

//--------------------------------------------------------------------------------//
// POST REQUEST
//--------------------------------------------------------------------------------//
server.post("/products", function (req, res, next) {
  console.log("products POST: received request");

  if (req.body.productId === undefined) {
    return next(new errors.BadRequestError("Product Id must be supplied"));
  }
  if (req.body.price === undefined) {
    return next(new errors.BadRequestError("Price must be supplied"));
  }
  if (req.body.name === undefined) {
    return next(new errors.BadRequestError("Name must be supplied"));
  }
  if (req.body.quantity === undefined) {
    return next(new errors.BadRequestError("Quantity must be supplied"));
  }

  let newProduct = {
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  // Create the product using the persistence engine
  productsSave.create(newProduct, function (error, product) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)));

    postCount++;
    console.log(
      "Processed Request Count--> Get:" + getCount + ", Post:" + postCount
    );
    console.log("products POST: sending response");

    // Send the product if no issues
    res.send(201, product);
  });
});
