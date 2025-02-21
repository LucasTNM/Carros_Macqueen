const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/add', cartController.addToCart);
router.get('/:cpf', cartController.getCart);
router.delete('/remove/:cpf/:carName', cartController.removeFromCart);
router.delete('/:cpf', cartController.clearCart);

module.exports = router;