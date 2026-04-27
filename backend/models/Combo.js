const mongoose = require('mongoose');

const comboSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null // null if platform combo
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    discountLabel: {
      type: String // e.g. "Tiết kiệm 18%"
    },
    originalPrice: {
      type: Number,
      required: true
    },
    comboPrice: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: String,
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Combo = mongoose.model('Combo', comboSchema);

module.exports = Combo;
