import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
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
import OrderConfirmation from "./pages/OrderComfirmation";
import AddProducts from "./pages/AddProducts";
import UpdateProducts from "./pages/UpdateProducts";

function App() {
  return (
    <AuthProvider>
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
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/add-product" element={<AddProducts/>} />
              <Route path="/update-product" element={<UpdateProducts/>} />
            </Routes>
          </main>
          <Footer />
        </Router>
    </AuthProvider>
  );
}

export default App;
