import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './LoginPage.scss'; // Імпортуємо SCSS-файл

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      }, { withCredentials: true }); // Include credentials
  
      console.log("Login response:", response.data); // Log the response
  
      const doctorId = response.data._id; // Access doctorId from response
      localStorage.setItem("doctorId", doctorId); // Store doctorId in localStorage
      localStorage.setItem("isLoggedIn", "true"); // Store login status as a string
      
      navigate(`/doctor/${doctorId}`); // Redirect to profile
      window.location.reload()
    } catch (err) {
      console.error("Login error:", err.response.data); // Log the error response
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container"> 
      <div className="form-container">
        <div className="form-column">
          <h1>ВХІД</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Електорнна пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Увійти</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div> 
  );
};

export default LoginPage;
