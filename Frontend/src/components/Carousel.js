import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";


const ProductCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/product/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data._embedded?.products || []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="mt-4">
    {products.length > 0 ? (
    <Carousel>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <img
            className="d-block w-100"
            src={product.img} // Assuming the image is in Base64 format
            alt={product.name}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption style={{ color: 'black' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <p>Loading products...</p>
  )}
</div>

  );
};

export default ProductCarousel;
