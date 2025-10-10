const products = require("../../data/product.json");
const Products = require("../models/product");
const index = async (req, res) => {
  try {
    const prod = await Products.find({});
    res.render('index', {
        title: 'Toko Online Sederhana',
        products: prod,
    });
  } catch (err) {
    res.status(500).send('gagal menampilkan produk');
  }
}

module.exports = { index };