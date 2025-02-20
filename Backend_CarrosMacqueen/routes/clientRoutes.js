const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");

// Rotas CRUD para clientes
router.post("/", clientController.createClient);
router.get("/", clientController.getClients);
router.post("/login", clientController.loginClient);
router.delete("/:cpf", clientController.deleteClient);
router.post("/cadastro", clientController.createClient);
router.post("/password-reset", clientController.passwordReset);
router.post("/verify-reset-code", clientController.verifyResetCode);
router.post("/reset-password/:token", clientController.resetPassword);

module.exports = router;
