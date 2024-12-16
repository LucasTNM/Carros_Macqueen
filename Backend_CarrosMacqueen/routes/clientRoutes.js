const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController'); // Importa o controlador de clientes

// Rotas CRUD para clientes
router.post('/clients', clientController.createClient);
router.get('/clients', clientController.getClients);
router.get('/cpf/:cpf', clientController.getClientByCPF); // Atualiza a rota para buscar pelo CPF
router.put('/:id', clientController.updateClientById);
router.delete('/:id', clientController.deleteClientById);

module.exports = router;