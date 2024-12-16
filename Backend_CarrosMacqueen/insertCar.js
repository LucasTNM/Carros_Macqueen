const mongoose = require('mongoose');
const Car = require('./models/carModel'); // Importa o modelo do carro
const connectDB = require('./config/db');

// Conectar ao MongoDB Atlas
connectDB();

// Lista de carros a serem inseridos
const cars = [
  {
    name: "Mustang GTX350",
    class: "Esportivo",
    year: 1965,
    price: 8000000,
    image: "https://conteudo.imguol.com.br/c/entretenimento/09/2020/03/12/mustang-shelby-gt350r-prototype-1965-guiado-por-ken-miles-1584020444193_v2_900x506.jpg",
  },
];

// Inserir os carros no banco de dados
Car.insertMany(cars)
  .then(() => console.log("Carros inseridos com sucesso!"))
  .catch((err) => console.error("Erro ao inserir carros:", err))
  .finally(() => mongoose.connection.close()); // Fechar a conexão após a inserção