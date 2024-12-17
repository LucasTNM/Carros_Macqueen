const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

// Rotas CRUD para clientes
router.post('/', clientController.createClient);
router.get('/', clientController.getClients);

// Outras rotas para clientes podem ser adicionadas aqui

module.exports = router;