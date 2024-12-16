const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const clientSchema = new mongoose.Schema(
    {
        clientId: { type: Number, unique: true }, // Adiciona o campo clientId
        name: { type: String, required: true },
        CPF: { type: String, required: true },
        email: { type: String, required: true },
        DateOfBirth: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    { timestamps: true }
);

// Configura o plugin AutoIncrement para iniciar a contagem dos IDs a partir de 1
clientSchema.plugin(AutoIncrement, { inc_field: 'clientId', start_seq: 1 });

module.exports = mongoose.model('Client', clientSchema);