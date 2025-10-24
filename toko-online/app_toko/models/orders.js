const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            priceAtOrder: {
                type: Number,
                required: true,

            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type : String,
        enum : ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default : 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;