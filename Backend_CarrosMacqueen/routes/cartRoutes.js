const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/add', cartController.addToCart);
router.get('/:email', cartController.getCart);
router.delete('/remove/:email/:carName', cartController.removeFromCart);
router.delete('/:email', cartController.clearCart);

module.exports = router;