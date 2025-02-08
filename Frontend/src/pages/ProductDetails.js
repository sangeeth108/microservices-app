import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/product/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [id]);

  const handleOrderNow = () => {
    navigate("/checkoutpage", { state: { productId: id, quantity } });
  };

  if (!product) {
    return <div className="container text-center mt-5"><h3>Loading...</h3></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0 rounded-3">
        <div className="row g-4 align-items-center">
          <div className="col-md-5 text-center">
            {product.img && (
              <img 
                src={product.img} 
                className="img-fluid rounded" 
                alt={product.name} 
                style={{ maxHeight: "370px", width: "100%", objectFit: "contain" }}
              />
            )}
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h1 className="card-title fw-bold">{product.name}</h1>
              <p className="card-text text-muted fs-5">{product.description}</p>
              <h3 className="text-primary fw-semibold">${product.price.toFixed(2)}</h3>
              <p className={`fw-bold fs-5 ${product.inventory > 0 ? "text-success" : "text-danger"}`}>
                {product.inventory > 0 ? `In Stock: ${product.inventory}` : "Out of Stock"}
              </p>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input 
                  type="number" 
                  id="quantity" 
                  className="form-control" 
                  min="1" 
                  max={product.inventory} 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.inventory, parseInt(e.target.value))))}
                  style={{maxWidth: 70}} 
                  required 
                />
              </div>
              <button onClick={handleOrderNow} className="btn btn-outline-secondary btn-lg mt-3">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
