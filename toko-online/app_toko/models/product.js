const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama Produk Harus di Isi'],
        // untuk menghilangkan spasi di awal dan akhir
        trim: true,
    },
    price:{
        type: Number,
        required: [true, "Harga produk harus di isi"],
        min: [1000, "Harga produk harus 1000"]
    },
    description: {
        type: String,
        required: false // opsional
    },
    stock: {
        type: Number,
        default: 0 // Nilai bawakan 0
    },
    createAt : {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;