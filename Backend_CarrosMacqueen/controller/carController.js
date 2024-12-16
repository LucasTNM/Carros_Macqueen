const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
  try {
    const { name, class: carClass, year, price, image } = req.body;
    const car = new Car({ name, class: carClass, year, price, image });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar carro', error: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros', error: error.message });
  }
};

exports.getCarByName = async (req, res) => {
  try {
    const car = await Car.findOne({ name: req.params.name });
    if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carro', error: error.message });
  }
};

exports.updateCarByName = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar carro', error: error.message });
  }
};

exports.deleteCarByName = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ name: req.params.name });
    if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
    res.json({ message: 'Carro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar carro', error: error.message });
  }
};

exports.getCarsByClass = async (req, res) => {
  try {
    const cars = await Car.find({ class: req.params.class });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros por classe', error: error.message });
  }
};

exports.getCarsByYear = async (req, res) => {
  try {
    const cars = await Car.find({ year: req.params.year });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros por ano', error: error.message });
  }
};

exports.getCarsByPriceRange = async (req, res) => {
  try {
    const cars = await Car.find({ price: { $gte: req.params.min, $lte: req.params.max } });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros por faixa de preço', error: error.message });
  }
};

exports.updateCarImageByName = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate({ name: req.params.name }, { image: req.body.image }, { new: true });
    if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar imagem do carro', error: error.message });
  }
};

exports.getRecentCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }).limit(10);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros recentes', error: error.message });
  }
};

exports.getExpensiveCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ price: -1 }).limit(10);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros mais caros', error: error.message });
  }
};

exports.getCheapCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ price: 1 }).limit(10);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carros mais baratos', error: error.message });
  }
};