import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAccount = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve userId from localStorage
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user?.userId;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:9090/orders/search/findByUserId?userId=${userId}`)
        .then(response => {
          setOrders(response.data._embedded.orders);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
          setError("Failed to load orders.");
          setLoading(false);
        });
    }
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "table-warning";    // Yellow
      case "PROCESSING": return "table-primary"; // Blue
      case "SHIPPED": return "table-info";       // Light Blue
      case "DELIVERED": return "table-success";  // Green
      case "CANCELLED": return "table-danger";   // Red
      default: return "";
    }
  };

  if (loading) return <div className="container text-center mt-5"><h3>Loading...</h3></div>;
  if (error) return <div className="container text-center mt-5"><h3>{error}</h3></div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={getStatusColor(order.status)}>
                <td>{order.id}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAccount;
