const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    client: { type: String, required: true },
    items: [
      {
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
