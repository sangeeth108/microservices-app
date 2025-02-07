import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/product/products")
      .then(response => {
        setProducts(response.data._embedded.products);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm">
              {product.img && (
                <img src={product.img} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="text-primary">${product.price.toFixed(2)}</h6>
                <p className={`fw-bold ${product.inventory > 0 ? "text-success" : "text-danger"}`}>
                  {product.inventory > 0 ? `In Stock: ${product.inventory}` : "Out of Stock"}
                </p>
                <Link to={`/products/${product.id}`} className="btn btn-primary">
                  View Details
                </Link> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
