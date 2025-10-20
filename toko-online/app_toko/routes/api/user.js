const express = require('express');
const router = express.Router();
const userController = require("../../controllers/user");

router.post('/', userController.createUser);
router.get('/', userController.all);
router.get('/:id', userController.detailuser);
router.put('/:id', userController.updateuser);
router.delete('/:id', userController.destroy);

module.exports = router;    