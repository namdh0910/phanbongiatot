const mongoose = require('mongoose');

const flashSaleSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    salePrice: { type: Number, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    maxQty: { type: Number, default: 0 }, // 0 means unlimited
    soldQty: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const FlashSale = mongoose.model('FlashSale', flashSaleSchema);
module.exports = FlashSale;
