import { useCart } from "../CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between">
        <div>
          <h5>{item.productId.name}</h5>
          <p>Price: ${item.productId.price} | Quantity: {item.quantity}</p>
        </div>
        <button className="btn btn-danger" onClick={() => removeFromCart(item.productId._id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
