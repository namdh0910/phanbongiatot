const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  source: { type: String, default: 'website' }, 
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: { type: Number, default: 0 },
  note: { type: String },
  isContacted: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'called', 'shipped', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
