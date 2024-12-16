const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const clientController = require('../controller/clientController'); // Importa o controlador de clientes

// Rotas CRUD para carros
router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/:name', carController.getCarByName);
router.put('/cars/:name', carController.updateCarByName);
router.delete('/cars/:name', carController.deleteCarByName);
router.get('/cars/class/:class', carController.getCarsByClass);
router.get('/cars/year/:year', carController.getCarsByYear);
router.get('/cars/price/:min/:max', carController.getCarsByPriceRange);
router.put('/cars/:name/image', carController.updateCarImageByName);
router.get('/cars/recent', carController.getRecentCars);
router.get('/cars/expensive', carController.getExpensiveCars);
router.get('/cars/cheap', carController.getCheapCars);

module.exports = router;