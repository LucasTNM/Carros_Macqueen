const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const IClientDAO = require('./IClientDAO.js');

const Client = require('../models/Client');

class ClientDAO_Mongoose extends IClientDAO{

   constructor(){ 
    super();
   }
     async create(req){
          const { name, CPF, email, phone, DateOfBirth, password, address, cards } = req.body;

          if (!name || !CPF || !email || !phone || !DateOfBirth || !password || !address) {
            throw new Error("Preencha todos os campos");
          }

          const cpfRegex = /^\d{11}$/;
          if (!cpfRegex.test(CPF)) {
            throw new Error("O CPF deve ter exatamente 11 dígitos e conter apenas números");
          }

          const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
          if (!passwordRegex.test(password)) {
            throw new Error("A senha deve ter no mínimo 8 dígitos, um caractere especial e uma letra maiúscula");
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const client = new Client({
            name,
            CPF,
            email,
            phone,
            DateOfBirth,
            password: hashedPassword,
            address,
            cards,
          });

          await client.save();
          return client;
     }  
     async recovery(){ 
          let clients = await Client.find();
          return clients; 
         }
     async update(req){
       let client = await Client.findByIdAndUpdate(req.params.id,req.body, 
       {new:true});
       return client;
       
     }
     async delete(req){
        let client = await Client.findOneAndDelete({ CPF: req.params.cpf });
        return client; 
     } 
  
     async search(req){
        let clients = await Client.find(
          { email : req.query.email}
                                   ); 
       return clients;
       
     } 
     
     async findByEmail(req){
        let client = await Client.findOne({ email: req.params.email });
        return client;
     }

     async findByResetCode(resetCode){
        let client = await Client.findOne({ 
          resetCode: resetCode,
          resetCodeExpires: { $gt: Date.now() }
        });
        return client;
     }
   
}
module.exports = ClientDAO_Mongoose;
