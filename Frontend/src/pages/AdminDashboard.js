import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const statusColors = {
  PENDING: "badge bg-warning",
  PROCESSING: "badge bg-primary",
  SHIPPED: "badge bg-purple",
  DELIVERED: "badge bg-success",
  CANCELLED: "badge bg-danger",
};

const statusOptions = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:9090/orders");
      setOrders(response.data._embedded.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:9090/orders/${orderId}`, { status: newStatus }, {
        headers: { "Content-Type": "application/json" }
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div className="container text-center mt-5"><h3>Loading Orders...</h3></div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <Link to="/add-product" className="btn btn-success">➕ Add Products</Link>
        <Link to="/update-product" className="btn btn-success"> Update Products</Link>

      </div>
      

      <h3 className="mt-4">All Orders</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`${statusColors[order.status]} p-2 rounded`}>
                      {order.status}
                    </span>
                    <select
                      className="form-select mt-2"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/order-confirmation/${order.id}`} className="btn btn-info btn-sm">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
