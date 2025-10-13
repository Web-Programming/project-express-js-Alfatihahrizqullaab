var express = require("express");
var router = express.Router();
var productController = require("../controllers/product");

// Home ambil produk dari database
router.get("/", productController.index);

// Search tetap gunakan mainController
var mainController = require("../controllers/main");
router.get("/search", mainController.search);

// Detail produk
router.get("/:id", productController.detail);

module.exports = router;
