var express = require("express");
var router = express.Router();
var mainController = require("../controllers/main");

// Home
router.get("/", mainController.index);

// Search
router.get("/search", mainController.search);

module.exports = router;
