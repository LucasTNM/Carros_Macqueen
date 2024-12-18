const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
    {
        cardNumber: { type: String, required: true },
        cardExpiry: { type: String, required: true },
        cardCVV: { type: String, required: true },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);