import { useCart } from "../CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.productId._id} item={item} />
          ))}
          <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
