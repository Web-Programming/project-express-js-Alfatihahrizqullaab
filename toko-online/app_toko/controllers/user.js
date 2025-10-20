    const Product = require("../models/product");
    const Users = require("../models/user");
const { detail } = require("./product");


    const all = async(req,res) => {
        try{
            const user = await Users.find({});
            res.status(200).json(
                {
                    status: true,
                    message: 'Data User berhasil diambil',
                    data: user
                }
            )
        }catch(err){
            res.status(500).json({
                status: false,
                message: 'Gagal memuat user'
            })
        }
    }


    const createUser = async(req, res) => {
        try {
            const newUser = new Users({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                isAdmin: req.body.isAdmin,
            })
            
            const user = await newUser.save();
            if(!newUser) {
                throw {
                    statusCode: 400,
                    message: 'Gagal menyimpan user',
                }
            }
            res.status(200).json({
                status: true,
                message: 'User berhasil disimpan',
                data: user
            })
        }catch(err){
            const {statusCode = 500, message = "internal server Err"} = err;
            res.status(statusCode).json({
                status: false,
                message:  message
            })
        }
    }

    const detailuser = async(req, res) => {
        try{
            const userId = req.params.id
            const user = await Users.findById(userId);

            if(!user){
                return res.status(400).json({
                    status: false,
                    message: 'User tidak ditemukan'
                })
            }else{
                res.status(200).json({
                    status: true,
                    message: 'berhasil'
                })
            }
        }catch(err){
            res.status(500).json({
                status: false,
                message: 'Gagal menampilkan user'
            })

        }

    }

    const updateuser = async(req, res) => {
        try{
            const user = await Users.findByIdAndUpdate(req.params.id, req.body,{
                new: true,
                runValidators: true
            })

            if(!user){
                res.status(400).json({
                    status: false,
                    message: 'User tidak ditemukan'
                })
            }else{
                res.status(200).json({
                    status: true,
                    message: 'User berhasil update',
                    data: user
                })
            }
        }catch(err){
            if(err.username === 'CastError'){
                res.status(400).json({
                    status: false,
                    message: 'Format ID tidak Valid'
                })
            }else if(err.username === "Validation ERROR"){
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
            const user = await Users.findByIdAndDelete(req.params.id)

            if(!user){
                res.status(404).json({
                    status: false,
                    message: 'User tidak ditemukan'
                })
            }else{
                res.status(200).json({
                    status: true,
                    message: 'user berhasil dihapus',
                    data: user
                })
            }
        }catch(err){
            if(err.username === 'CastError'){
                res.status(400).json({
                    status: false,
                    message: 'Format ID tidak Valid'
                })
            }else{
                res.status(500).json({
                    status: false, message: 'Internal Server Error'
                })
            }
        }
    }


    module.exports = {createUser, detailuser, updateuser, destroy, all};