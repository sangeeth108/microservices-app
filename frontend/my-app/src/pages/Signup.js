import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/user/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });
  
      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }
  
      const data = await response.json();
      const userData = { name: data.name, email: data.email, role: data.role, userId: data.userId }; // assuming response contains name and email
      login(userData); // Update context with logged-in user data
  
      if (data.role === "admin") {
        navigate("/admindashboard"); // Redirect to admin dashboard
      } else {
        navigate("/"); // Redirect to home page
      }

    } catch (error) {
      alert(error.message); // Display any error to the user
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select 
            id="role" 
            className="form-select" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required 
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
