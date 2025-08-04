const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

const clientSchema = new mongoose.Schema(
  {
    clientId: { type: Number, unique: true }, // Adiciona o campo clientId
    name: { type: String, required: true },
    CPF: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    DateOfBirth: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    resetCode: { type: String },
    resetCodeExpires: { type: Date },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Adiciona a referência ao carrinho
  },
  { timestamps: true }
);

// Configura o plugin AutoIncrement para iniciar a contagem dos IDs a partir de 1
clientSchema.plugin(AutoIncrement, { inc_field: 'clientId', start_seq: 1 });

module.exports = mongoose.model('Client', clientSchema);
