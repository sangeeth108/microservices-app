import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order details
        const orderResponse = await axios.get(`http://localhost:9090/orders/${orderId}`);
        setOrder(orderResponse.data);

        // Fetch order items
        const itemsResponse = await axios.get(`http://localhost:9090/orders/${orderId}/items`);
        setOrderItems(itemsResponse.data._embedded.orderItems);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="container text-center mt-5"><h3>Loading Order Details...</h3></div>;
  }

  if (!order) {
    return <div className="container text-center mt-5"><h3>Order not found!</h3></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0 rounded-3">
        <h2 className="text-center mb-4">Order Summary</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

        <h3 className="mt-4">Ordered Items</h3>
        <ul className="list-group">
          {orderItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              <span>Product ID: {item.productId} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        {user && user.userId === "user" ? (
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderConfirmation;
