const express = require('express');
const Car = require('../models/carModel');
const router = express.Router();

// Rotas CRUD para carros
router.post('/', async (req, res) => {
  try {
    const { name, model, price, image } = req.body;
    const car = new Car({ name, model, price, image });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar carro', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros', error: error.message });
  }
});

module.exports = router;
