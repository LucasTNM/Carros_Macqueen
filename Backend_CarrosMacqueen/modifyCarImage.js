const mongoose = require('mongoose');
const Car = require('./models/carModel'); // Importa o modelo do carro
const connectDB = require('./config/db');

// Conectar ao MongoDB Atlas
connectDB();

// URL da nova imagem
const newImageURL = "https://www.ultimatecarpage.com/images/car/1289/Lamborghini-Countach-LP400-9503.jpg";

// Atualizar a imagem do carro "Lamborghini Countach"
Car.findOneAndUpdate(
  { name: "Lamborghini Countach" }, // Encontrar o carro pela nome
  { $set: { image: newImageURL } }, // Atualizar o campo image
  { new: true } // Retornar o documento atualizado
)
  .then((updatedCar) => {
    if (updatedCar) {
      console.log("Imagem da Lamborghini Countach atualizada com sucesso!");
    } else {
      console.log("Carro não encontrado.");
    }
  })
  .catch((err) => console.error("Erro ao atualizar imagem:", err))
  .finally(() => mongoose.connection.close()); // Fechar a conexão após a atualização
