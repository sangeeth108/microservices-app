import { createContext, useContext, useEffect, useState } from "react";
import CartService from "./CartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      CartService.getCart(user.userId).then((cartData) => {
        setCart(cartData?.items || []);
      });
    }
  }, [user]);

  const addToCart = async (productId, quantity) => {
    if (!user) return;
    const updatedCart = await CartService.addToCart(user.userId, productId, quantity);
    setCart(updatedCart.items);
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const updatedCart = await CartService.removeFromCart(user.userId, productId);
    setCart(updatedCart.items);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
