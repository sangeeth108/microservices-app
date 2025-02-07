const API_URL = "http://localhost:5003/api";

const CartService = {
  getCart: async (userId) => {
    const response = await fetch(`${API_URL}/cart/${userId}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.items || [];
  },

  addToCart: async (userId, productId, quantity) => {
    const response = await fetch(`${API_URL}/cart/${userId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },

  removeFromCart: async (userId, productId) => {
    const response = await fetch(`${API_URL}/cart/${userId}/items/${productId}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default CartService;
