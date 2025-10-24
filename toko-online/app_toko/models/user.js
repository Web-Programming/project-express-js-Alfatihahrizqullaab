const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username harus diisi'],
        unique: true,
        trim : true
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Email tidak valid'
        ], // regex untuk validasi email
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minlength: [6, 'kata sandi minimal 6 karakter'], 
        select: false // agar password tidak tampil saat fetch data
    },
    address: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

const user = mongoose.model('User', userSchema)
module.exports = user