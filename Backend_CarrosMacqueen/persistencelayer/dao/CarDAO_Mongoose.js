const mongoose = require('mongoose');

const ICarDAO = require('./ICarDAO.js');

const Car = require('../models/Car');

class CarDAO_Mongoose extends ICarDAO{

   constructor(){ 
    super();
   }
     async create(req){
          const car =  await Car.create(req.body);
          return car;
     }  
     async recovery(){ 
          let cars = await Car.find();
          return cars; 
         }
     async update(req){
       let car = await Car.findByIdAndUpdate(req.params.id,req.body, 
       {new:true});
       return car;
       
     }
     async delete(req){
        let car = await Car.findByIdAndDelete(req.params.id);
        return car; 
     } 
  
     async search(req){
        let cars = await Car.find(
          { name : req.query.name}
                                   ); 
       return cars;
       
     } 
     
     async findByName(req){
        let car = await Car.findOne({ name: req.params.name });
        return car;
     }

     async deleteByName(req){
        let car = await Car.findOneAndDelete({ name: req.params.name });
        return car;
     }
   
}
module.exports = CarDAO_Mongoose;
