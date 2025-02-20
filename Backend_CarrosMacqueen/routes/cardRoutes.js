const express = require('express');
const router = express.Router();
const cardController = require('../controller/cardController');

router.post('/add', cardController.addCard);
router.get('/:clientCPF', cardController.getCardsByClientCPF);
router.delete('/:cardNumber', cardController.deleteCard); // Atualizar rota para excluir cartão pelo número do cartão

module.exports = router;