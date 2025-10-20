const products = require("../../data/product.json");
const Products = require("../models/product");
const index = async (req, res) => {
  try {
    const prod = await Products.find({});
    res.render('index', {
        title: 'Toko Online Sederhana',
        products: prod,
        query: ""
    });
  } catch (err) {
    res.status(500).send('gagal menampilkan produk');
  }
}

const detail = async (req, res, next) => {
    try{
        const productId = req.params.id;
        const product = await Products.findById(productId);
        
        if(!product){
            return res.status(404).send('Produk tidak ditemukan!');
        }
        res.render('product-detail',
            {
                title : product.name,
                product: product
            }
        );
    } catch(err) {
        res.status(404).send("Gagal memuat detail product")
    }
}

const apiall = async (req, res) => {
    try{
        const prod = await Products.find({});
        res.status(200).json(
            {
                status: true,
                message: "Data produk berhasil diambil",
                data: prod
            }
        )
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal membuat produk"
        })

    }
}


// CRUD Controller
// create
const create = async(req,res) => {
    try{
        //ambil data dari request body
        const newProduct = new Products({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock || 0
        });
        // simpan data ke mongodb model product
        const product = await newProduct.save();
        // kirim respon sukses
        res.status(200).json({
            status: true,
            message: 'Produk berhasil disimpan',
            data: product
        })


    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal membuat produk"
        });
    }
}

const detailproduk = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Products.findById(productId);

        if(!product){
            return res.status(404).json({
                status: false,
                message: "Produk tidak ditemukan"
            });
        }

        res.status(200).json({
            status: true,
            message: "Gagal memuat detail produk"
        })

    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal membuat produk"
        });
    }
}

//update data
const update = async (req, res) => {
    try{
        const product = await Products.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })

        if(!product){
            res.status(404).json({
                status: false,
                message: 'Product tidak ditemukan'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Product berhasil diupdate', 
            data: product
        })

    }catch(err){
        if(err.name === 'CastError'){
            res.status(400).json({
                status: false,
                message: 'Format ID tidak valid'
            })
        }else if(err.name === 'Validation ERROR'){
            res.status(400).json({
                status: false,
                message: err.message
            })
        }else{
            res.status(500).json({
                status: false, message: 'Internal Server Error'
            })
        }
    }

}

const destroy = async (req, res) => {
    try{
        const product = await Products.findByIdAndDelete(req.params.id)

        if(!product){ // respon err
            res.status(404).json({
                status: false,
                message: 'Product tidak ditemukan'
            });
        }else{ // respon sukses
            res.status(200).json({
                status: true,
                message: 'Product berhasil dihapus', 
                data: product
            })
        }

        

    }catch(err){
        if(err.name === 'CastError'){
            res.status(400).json({
                status: false,
                message: 'Format ID tidak valid'
            })
        }else{
            res.status(500).json({
                status: false, message: 'Internal Server Error'
            })
        }
    }
}

module.exports = { index, apiall, detail, create, detailproduk, update, destroy };