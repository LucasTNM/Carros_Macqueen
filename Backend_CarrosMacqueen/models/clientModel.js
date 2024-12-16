const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        cars: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);