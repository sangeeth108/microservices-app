import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserAccount from "./pages/UserAccount";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main style={{ minHeight: "80vh", padding: "20px 0" }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/useraccount" element={<UserAccount />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkoutpage" element={<CheckoutPage/>} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
