import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            department,
            email,
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Account Created Successfully!");

        navigate("/login");

      } else {

        alert("Signup Failed");

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }
  };

  return (

  <div className="login-container">

    <div className="login-card">

      <h1 className="portal-title">CareerPulse</h1>

      <p className="portal-subtitle">
        Create Your Student Account
      </p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Department (CSE, ECE, ME...)"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="login-btn"
        onClick={handleSignup}
      >
        Create Account
      </button>

      <p className="signup-text">
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>

  </div>
);
}

export default Signup;