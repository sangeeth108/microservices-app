import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { Spinner } from 'react-bootstrap'; // Importing a loading spinner

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, quantity } = location.state || {};
  const [product, setProduct] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(true);

  // Retrieve userId from localStorage
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:3000/product/products/${productId}`)
        .then(response => {
          setProduct(response.data);
          setTotalCost(response.data.price * quantity);
          setLoading(false); // Stop the loader once product is fetched
        })
        .catch(error => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId, quantity]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address || !city || !zip) {
      alert("Please fill in all address fields.");
      return;
    }

    if (!user) {
      alert("User not logged in. Please log in to place an order.");
      return;
    }

    try {
      // Step 1: Create the order
      const orderResponse = await axios.post("http://localhost:9090/orders", {
        userId: user.userId,
        totalPrice: totalCost,
        status: "PROCESSING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deliveryAddress: `${address}, ${city}, ${zip}`
      });

      const orderId = orderResponse.data.id;

      // Step 2: Create the order item
      await axios.post("http://localhost:9090/orderItems", {
        order: `http://localhost:9090/orders/${orderId}`, // HATEOAS reference
        productId,
        quantity,
        price: product.price
      });

      // Step 3: Update the inventory in Product Service
      const newInventory = product.inventory - quantity;
      if (newInventory < 0) {
        alert("Not enough stock available.");
        return;
      }

      await axios.patch(`http://localhost:3000/product/products/${productId}`, {
        inventory: newInventory
      });

      alert("Order placed successfully!");
      navigate(`/order-confirmation/${orderId}`); // Redirect to order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading Order Details...</span>
      </div>
    );
  }

  if (!product) {
    return <div className="container text-center mt-5"><h3>Product Not Found</h3></div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Order Summary</h2>
        <div className="d-flex justify-content-between mb-3">
          <span><strong>Product:</strong> {product.name}</span>
          <span><strong>Price:</strong> ${product.price.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span><strong>Quantity:</strong> {quantity}</span>
          <span><strong>Order Total:</strong> ${totalCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="card mt-4 p-4 shadow-sm">
        <h3 className="mb-4">Delivery Address</h3>
        <form onSubmit={handlePlaceOrder}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input 
              type="text" id="address" className="form-control" 
              placeholder="Enter your address" required 
              value={address} onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input 
              type="text" id="city" className="form-control" 
              placeholder="Enter your city" required 
              value={city} onChange={(e) => setCity(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">Zip Code</label>
            <input 
              type="text" id="zip" className="form-control" 
              placeholder="Enter your zip code" required 
              value={zip} onChange={(e) => setZip(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
