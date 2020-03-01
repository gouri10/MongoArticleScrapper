var express = require("express");
// Set Handlebars.
var exphbs = require("express-handlebars");


var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

var router=express.Router();
require("./config/routes")(router);

app.use(router);



var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapper";
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});