const express = require('express');
const router = express.Router();
const productController = require("../../controllers/product");

//URL CREATE - POST (/api/product)
router.post('/', productController.create);
//URL READ ALL - GET (/api/product)
router.get('/', productController.apiall);
//URL READ ONE-DETAIL - GET (/api/product/:id)
router.get('/:id', productController.detailproduk)
//URL UPDATE - PUT (/api/product/:id)
router.put('/:id', productController.update)
//URL DELETE - DELETE (/api/product/:id)
router.delete('/:id', productController.destroy)

module.exports = router