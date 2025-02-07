const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Add/Update Item in Cart
router.post('/cart/:userId/items', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Update the quantity if the product exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add the product to the cart if it doesn't exist
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error updating cart', error });
  }
});

// Remove Item from Cart
router.delete('/cart/:userId/items/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error removing item from cart', error });
  }
});

// Fetch Cart for a User
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching cart', error });
  }
});

// Clear Cart
router.delete('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }
    res.status(200).send({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error clearing cart', error });
  }
});

module.exports = router;