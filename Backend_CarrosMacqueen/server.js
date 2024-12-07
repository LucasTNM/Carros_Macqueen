const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Permite apenas este URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      credentials: true, // Permite cookies ou headers personalizados
    })
  );

app.use(express.json());

// Rotas principais
app.use('/api/cars', require('./routes/carRoutes.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
