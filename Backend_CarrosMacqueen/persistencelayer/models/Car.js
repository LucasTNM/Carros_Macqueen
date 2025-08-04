const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    details:{ type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
