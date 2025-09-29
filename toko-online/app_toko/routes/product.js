    const express = require('express');
    const router = express.Router();
    const products = require("../../data/product.json");

    router.get("/:id", function(req, res, next){
        const productId = parseInt(req.params.id); // tangkap ID dari URL
        const product = products.find(p => p.id == productId);

        if(!product){
            return res.status(404).send("produk tidak ditemukan")
        }

        res.render('product-detail', {
            title: product.name,
            product
        })
    })

    router.get('/:productId/review/:reviewId', function(req, res, next){
        const productId = req.params.productId;
        const reviewId = req.params.reviewId;
        // kirim kedua parameter ke view untuk ditampilkan 
        res.render('review-detail', {
            title: `Ulasan ${reviewId} untuk Produk ${productId}`,
            productId: productId,
            reviewId: reviewId
        })
    })

    module.exports = router;