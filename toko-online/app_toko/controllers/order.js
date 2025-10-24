const Orders = require('../models/orders');
const Users = require('../models/user');
const Products = require('../models/product');

exports.createOrder = async (req, res) => {
    try {
        const { user, orderItems } = req.body;

        // Validasi user
        if (!user || !orderItems || orderItems.length === 0) { 
            return res.status(400).json({ message: 'Data pesanan tidak lengkap.' }); 
        }

        // Hitung totalAmount dari orderItems apa itu reduce
        const totalAmount = orderItems.reduce((total, item) => {
            return total + (item.priceAtOrder * item.quantity);
        }, 0); 

        // Buat pesanan baru
        const newOrder = new Orders({
            user,
            orderItems,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json(
            { message: 'Pesanan berhasil dibuat.', data: newOrder }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan saat membuat pesanan.' });
    }
};

exports.allOrders = async (req, res) => {
    try {
        const orders = await Orders.find()
            .populate('user', 'username email') // hanya tampilkan field tertentu dari user
            .sort({ orderDate: -1 }); //urut terbaru ke terlama   

        res.status(200).json(
            { message: 'Data semua pesanan', data: orders }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil data pesanan.' });
    }
};


exports.detailOrder = async (req, res) => {
    try {
      const { id } = req.params;
        const order = await Orders.findById(id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        res.status(200).json(
            { message: 'Detail pesanan', data: order }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan.' });
    }
};

// ✅ UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Status pesanan tidak valid.' });
        }

        const order = await Orders.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        res.status(200).json({ message: 'Status pesanan diperbarui.', data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal memperbarui status pesanan.' });
    }
};
