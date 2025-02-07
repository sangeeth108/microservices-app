import React from "react";
import ProductCarousel from "../components/Carousel"; // Import the component
import ShopNow from "../components/Shopnow";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="container text-center col">
      <h1>Welcome to MyApp</h1>
      <p>Your awesome app description goes here.</p>
      <ProductCarousel />
      <ShopNow />
    </div>
  );
};

export default LandingPage;
