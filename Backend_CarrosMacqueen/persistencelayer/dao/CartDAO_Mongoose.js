const mongoose = require('mongoose');

const ICartDAO = require('./ICartDAO.js');

const Cart = require('../models/Cart');

class CartDAO_Mongoose extends ICartDAO{

   constructor(){ 
    super();
   }
     async create(req){
          const cart =  await Cart.create(req.body);
          return cart;
     }  
     async recovery(){ 
          let carts = await Cart.find().populate('items.car');
          return carts; 
         }
     async update(req){
       let cart = await Cart.findByIdAndUpdate(req.params.id,req.body, 
       {new:true});
       return cart;
       
     }
     async delete(req){
        let cart = await Cart.findByIdAndRemove(req.params.id);
        return cart; 
     } 
  
     async search(req){
        let carts = await Cart.find(
          { client : req.query.client}
                                   ); 
       return carts;
       
     } 
     
     async findByClientId(clientId){
        let cart = await Cart.findOne({ client: clientId }).populate('items.car');
        return cart;
     }

     async clearByClientId(clientId){
        let cart = await Cart.findOneAndUpdate(
          { client: clientId },
          { $set: { items: [] } },
          { new: true }
        );
        return cart;
     }
   
}
module.exports = CartDAO_Mongoose;
