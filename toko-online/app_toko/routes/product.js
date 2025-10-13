const express = require('express');
const router = express.Router();
const Products = require("../models/product"); // model mongoose
const productController = require("../controllers/product");
var mainController = require("../controllers/main");

router.get('/apiall', productController.apiall);
router.get("/search", mainController.search);
router.get('/all', productController.index);
router.get('/:id', productController.detail)


// // Tampilkan semua produk dari database
// router.get("/all", async (req, res, next) => {
//     try {
//         const prod = await Products.find();
//         res.render("index", {
//             title: "Toko Online Sederhana",
//             products: prod,
//             query:""
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Gagal mengambil data produk dari database');
//     }
// });

// // Tampilkan detail produk berdasarkan ID MongoDB
// router.get("/:id", async (req, res, next) => {
//     try {
//         const product = await Products.findById(req.params.id);
//         if (!product) {
//             return res.status(404).send("Produk tidak ditemukan");
//         }
//         res.render('product-detail', {
//             title: product.name,
//             product
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Terjadi kesalahan saat mengambil produk");
//     }
// });

// Halaman review produk
router.get('/:productId/review/:reviewId', (req, res, next) => {
    const { productId, reviewId } = req.params;
    res.render('review-detail', {
        title: `Ulasan ${reviewId} untuk Produk ${productId}`,
        productId,
        reviewId
    });
});

module.exports = router;
