import React from "react";
import ProductCarousel from "../components/Carousel"; // Import the component
import ShopNow from "../components/Shopnow";

const LandingPage = () => {
  return (
    <div className="container text-center col">
      <h1>Welcome to the Mobile World</h1>
      <p>Pick the best here with updated products.</p>
      <ProductCarousel />
      <ShopNow />
    </div>
  );
};

export default LandingPage;
