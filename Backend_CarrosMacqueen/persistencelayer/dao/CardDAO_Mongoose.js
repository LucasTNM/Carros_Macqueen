const mongoose = require('mongoose');
const dotenv = require("dotenv");

const ICardDAO = require('./ICardDAO.js');

const Card = require('../models/Card');

dotenv.config();

class CardDAO_Mongoose extends ICardDAO{

   constructor(){ 
    super();
    mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
   }
     async create(req){
          const card =  await Card.create(req.body);
          return card;
     }  
     async recovery(){ 
          let cards = await Card.find();
          return cards; 
         }
     async update(req){
       let card = await Card.findByIdAndUpdate(req.params.id,req.body, 
       {new:true});
       return card;
       
     }
     async delete(req){
        let card = await Card.findByIdAndRemove(req.params.id);
        return card; 
     } 
  
     async search(req){
        let cards = await Card.find(
          { clientCPF : req.query.clientCPF}
                                   ); 
       return cards;
       
     } 
     
     async findByClientId(clientCPF){
        let cards = await Card.find({ clientCPF: clientCPF });
        return cards;
     }
   
}
module.exports = CardDAO_Mongoose;
