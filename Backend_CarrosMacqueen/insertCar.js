const mongoose = require('mongoose');
const Car = require('./models/carModel'); // Importa o modelo do carro
const connectDB = require('./config/db');

// Conectar ao MongoDB Atlas
connectDB();

// Lista de carros a serem inseridos
const cars = [
  {
    name: "Lamborghini Diablo SE30",
    class: "Super Carro",
    year: 1990,
    price: 1309000,
    image: "https://hagerty-vid-images.imgix.net/vehicles/MecumMonterey2015_F115_Lamborghini_1991_Diablo_Coupe_ZA9DU07P9MLA12363_.JPG",
  },
  {
    name: "Bugatti EB 110 SS",
    class: "Super Carro",
    year: 1992,
    price: 2131000,
    image: "https://exclusivecarregistry.com/images/cars/preview/thumb_9367.jpg",
  },
  {
    name: "Lamborghini Countach",
    class: "Super Carro",
    year: 1974,
    price: 4900000,
    image: "https://www.carpixel.net/w/0dc4830a4aab5722dfa0e67f28bef3b1/lamborghini-countach-wallpaper-hd-47632.jpg",
  },
];

// Inserir os carros no banco de dados
Car.insertMany(cars)
  .then(() => console.log("Carros inseridos com sucesso!"))
  .catch((err) => console.error("Erro ao inserir carros:", err))
  .finally(() => mongoose.connection.close()); // Fechar a conexão após a inserção