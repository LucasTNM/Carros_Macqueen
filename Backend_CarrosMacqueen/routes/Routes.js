const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');

// Rotas CRUD para carros
router.post('/', carController.createCar);
router.get('/', carController.getCars);

// Novas rotas
router.get('/:name', carController.getCarByName);
router.put('/:name', carController.updateCarByName);
router.delete('/:name', carController.deleteCarByName);
router.get('/class/:class', carController.getCarsByClass);
router.get('/year/:year', carController.getCarsByYear);
router.get('/price/:min/:max', carController.getCarsByPriceRange);
router.put('/:name/image', carController.updateCarImageByName);
router.get('/recent', carController.getRecentCars);
router.get('/expensive', carController.getExpensiveCars);
router.get('/cheap', carController.getCheapCars);

module.exports = router;