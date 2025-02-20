const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    cardType: { type: String, required: true, enum: ['Crédito', 'Débito'] }, // Permitir apenas 'Crédito' ou 'Débito'
    cardNumber: { type: String, required: true },
    cardExpiry: { type: String, required: true },
    cardCVV: { type: String, required: true },
    fullName: { type: String, required: true },
    clientCPF: { type: String, required: true }, // Usar CPF do cliente
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);