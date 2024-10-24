import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn); // Зчитуємо статус логіну з localStorage
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Викликаємо бекенд для виходу
      localStorage.removeItem("isLoggedIn"); // Очищаємо дані
      localStorage.removeItem("doctorId");
      setIsLoggedIn(false);
      navigate("/login"); // Переходимо на сторінку логіну
      window.location.reload(); // Оновлюємо сторінку
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {!isLoggedIn ? (
          // Якщо не залогінений
          <>
            <li>
              <Link to="/login">Вхід</Link>
            </li>
            <li>
              <Link to="/register">Реєстрація</Link>
            </li>
          </>
        ) : (
          // Якщо залогінений
          <>
            <li>
              <Link to={`/doctor/${localStorage.getItem("doctorId")}`}>Профіль</Link>
            </li>
            <li>
              <Link to={`/patient/doctor/${localStorage.getItem("doctorId")}`}>Мої пацієнти</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Вийти</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
