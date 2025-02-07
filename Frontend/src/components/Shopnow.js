import { Button } from "react-bootstrap";

const ShopNow = () => {

  return (
    
    <div className="container-fluid text-center mt-5">
        <main style={{minHeight: "50vh", padding: "20px 0"}}>
        <p>Shop now for the latest products.</p>
        <Button variant="primary" size="lg" href="/products">
          Shop Now
        </Button>
        </main>
    </div>
  );
};

export default ShopNow;