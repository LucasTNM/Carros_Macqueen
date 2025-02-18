const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

// Rotas CRUD para clientes
router.post('/', clientController.createClient);
router.get('/', clientController.getClients);
router.post('/login', clientController.loginClient);
router.delete('/:cpf', clientController.deleteClient);

module.exports = router;