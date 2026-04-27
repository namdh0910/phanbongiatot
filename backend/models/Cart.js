const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      index: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        qty: {
          type: Number,
          required: true,
          default: 1
        },
        price: Number, // Snapshot for reference
        name: String,
        image: String
      }
    ],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      index: { expires: 0 } // TTL index
    }
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
