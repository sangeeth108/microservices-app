import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    inventory: "",
    img: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setProduct({ ...product, img: reader.result });
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/product/products", product, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage({ type: "success", text: "Product added successfully!" });
      setTimeout(() => navigate("/admindashboard"), 2000); // Redirect after success
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ type: "error", text: "Failed to add product. Try again!" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 650 }}>
      <h2>Add New Product</h2>
      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Inventory</label>
          <input
            type="number"
            name="inventory"
            className="form-control"
            value={product.inventory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
