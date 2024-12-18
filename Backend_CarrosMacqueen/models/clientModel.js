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
    },
    { timestamps: true }
);

// Configura o plugin AutoIncrement para iniciar a contagem dos IDs a partir de 1
clientSchema.plugin(AutoIncrement, { inc_field: 'clientId', start_seq: 1 });

// Middleware para hash da senha antes de salvar
clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Client', clientSchema);