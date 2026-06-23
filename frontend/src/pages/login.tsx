import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import careergrowth from "../assets/careergrowth.jpg";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/api/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if(data.success){

      localStorage.setItem(
        "student_id",
        data.student_id
      );

      window.location.href="/";
    }
  };
return (
  <div className="login-page">

    <div className="login-left">
      <img
        src={careergrowth}
        alt="careergrowth"
        className="careerimage"
      />
    </div>

    <div className="login-right">

      <div className="login-card">

        <h1 className="portal-title">
          CareerPulse
        </h1>

        <p className="portal-subtitle">
          Campus Placement Portal
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="signup-text">
          New here?
          <Link to="/signup">
            Create Account
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}
export default Login
