const ICarController = require('./ICarController.js');

const config = require('../config.js');
const CarDAO = require('../persistencelayer/dao/'+config.ICarDAO);
let cardao = new CarDAO();

class CarController extends ICarController{
  constructor(){
    super();
       
  }

  
  async show(req, res)
    {
  
       let cars = await cardao.recovery();
        return res.json(cars);
    }
  async store(req, res)
     {
        try {
          const car =  await cardao.create(req);
          return res.status(201).json(car);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao criar carro', error: error.message });
        }
     }
   async destroy(req,res){
         try {
           let car = await cardao.delete(req);
           if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
           return res.json({ message: 'Carro deletado com sucesso' });
         } catch (error) {
           return res.status(500).json({ message: 'Erro ao deletar carro', error: error.message });
         }
    }
   async update(req,res){
        try {
          let car = await cardao.update(req);
          if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
          return res.json(car);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao atualizar carro', error: error.message });
        }
    }

   async index(req,res)
    {
        try {
          let cars = await cardao.search(req);
          return res.json(cars);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar carros', error: error.message });
        }
    }

   async getByName(req,res)
    {
        try {
          let car = await cardao.findByName(req);
          if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
          return res.json(car);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar carro', error: error.message });
        }
    }

    // Métodos adicionais para manter funcionalidades existentes
    async getCarsByClass(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const cars = await Car.find({ class: req.params.class });
        res.json(cars);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros por classe', error: error.message });
      }
    }

    async getCarsByYear(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const cars = await Car.find({ year: req.params.year });
        res.json(cars);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros por ano', error: error.message });
      }
    }

    async getCarsByPriceRange(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const cars = await Car.find({ price: { $gte: req.params.min, $lte: req.params.max } });
        res.json(cars);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros por faixa de preço', error: error.message });
      }
    }

    async updateCarImageByName(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const car = await Car.findOneAndUpdate({ name: req.params.name }, { image: req.body.image }, { new: true });
        if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
        res.json(car);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar imagem do carro', error: error.message });
      }
    }

    async getRecentCars(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const cars = await Car.find().sort({ createdAt: -1 }).limit(10);
        res.json(cars);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros recentes', error: error.message });
      }
    }

    async getExpensiveCars(req, res) {
      try {
        const Car = require('../persistencelayer/models/Car');
        const cars = await Car.find().sort({ price: -1 }).limit(10);
        res.json(cars);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros mais caros', error: error.message });
      }
    }
  
}
module.exports = CarController;
