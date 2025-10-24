const express = require('express');
const router = express.Router();
const orderController = require("../../controllers/order");
const auth = require("../../middleware/authmiddleware");

router.post('/', auth.adminOnly , orderController.createOrder);
router.get('/', orderController.allOrders);
router.get('/:id', orderController.detailOrder);
router.put('/:id', auth.adminOnly, orderController.updateOrderStatus);

module.exports = router;