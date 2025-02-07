import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useCart } from "../CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart ({cart.length})</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
