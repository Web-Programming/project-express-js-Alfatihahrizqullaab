const products = require("../../data/product.json");

/* GET home page */
const index = (req, res) => {
  res.render("index", {
    title: "Toko Online Sederhana",
    products: products,   // ✅ konsisten
    query: ""             // default kosong
  });
};

/* GET search */
const search = (req, res) => {
  let q = req.query.q ? req.query.q.toLowerCase() : "";
  let filtered = products;

  if (q) {
    filtered = products.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  res.render("index", {
    title: "Toko Online Sederhana",
    products: filtered,
    query: req.query.q || ""
  });
};

module.exports = { index, search };
