const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // Reference to the product
  quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }, // Reference to the user
  items: [cartItemSchema], // Array of cart items
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the cart was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp for when the cart was last updated
});

// Update the `updatedAt` field before saving the document
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);