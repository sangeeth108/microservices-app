import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    inventory: "",
    img: "",
  });
  const [message, setMessage] = useState(null);

  // Fetch all products when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/product/products")
      .then((response) => {
        setProducts(response.data._embedded.products); // Access products from _embedded
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSelectProduct = (id) => {
    const product = products.find((prod) => prod.id === id);
    setSelectedProduct({ ...product });
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedProduct({ ...selectedProduct, img: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/product/products/${selectedProduct.id}`,
        selectedProduct,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage({ type: "success", text: "Product updated successfully!" });
      setTimeout(() => {
        setMessage(null);
        setSelectedProduct({
          id: "",
          name: "",
          price: "",
          description: "",
          inventory: "",
          img: "",
        }); // Clear the form
        window.location.reload(); // Reload the page
      }, 2000); // Clear message and reload after a few seconds
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage({ type: "error", text: "Failed to update product. Try again!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/products/${id}`);
      setMessage({ type: "success", text: "Product deleted successfully!" });
      setTimeout(() => {
        setMessage(null);
        setProducts(products.filter((product) => product.id !== id)); // Remove deleted product from state
      }, 2000); // Clear message after a few seconds
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage({ type: "error", text: "Failed to delete product. Try again!" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2>Update Product</h2>
      
      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.inventory}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectProduct(product.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={selectedProduct.name}
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
            value={selectedProduct.price}
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
            value={selectedProduct.description}
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
            value={selectedProduct.inventory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
