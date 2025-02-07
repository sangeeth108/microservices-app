import { useCart } from "../CartContext";

const CheckoutPage = () => {

  return (
    <div>
        <h2>Order Details</h2>
        <p>Order ID: 123456</p>
        <p>Order Date: 2021-12-31</p>
        <p>Order Status: Delivered</p>
        <p>Order Total: $100.00</p>
    </div>
  );
};

export default CheckoutPage;