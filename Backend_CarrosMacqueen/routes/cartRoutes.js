const express = require('express');
const router = express.Router();
const cartController = require("../controller/cartController");

router.post('/add', cartController.addToCart);
router.get('/:cpf', cartController.getCart);
router.delete('/remove/:cpf/:carName', cartController.removeFromCart); // Rota para remover um item específico do carrinho pelo nome do carro
router.delete('/:cpf', cartController.clearCart); // Rota para limpar todos os itens do carrinho

module.exports = router;