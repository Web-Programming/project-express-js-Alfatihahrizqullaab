var express = require("express");
var router = express.Router();
var mainController = require("../controllers/main");
var productController = require("../controllers/product");

// Home
router.get("/all", productController.index);

// Search
router.get("/search", mainController.search);

module.exports = router;
