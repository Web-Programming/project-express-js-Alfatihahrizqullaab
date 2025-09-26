var express = require('express');
var router = express.Router();
var product = require('../data/product.json');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Toko Online Sederhana',
    products: product,
    query: ""   // ✅ tambahkan ini supaya tidak undefined
  });
});

/* GET search */
router.get('/search', function(req, res, next) {
  let q = req.query.q ? req.query.q.toLowerCase() : "";
  let filtered = product;

  if (q) {
    filtered = product.filter(p => 
      p.name.toLowerCase().includes(q)
    );
  }

  res.render('index', { 
    title: 'Toko Online Sederhana',
    products: filtered,
    query: req.query.q || ""   // ✅ kirimkan query asli
  });
});

module.exports = router;
