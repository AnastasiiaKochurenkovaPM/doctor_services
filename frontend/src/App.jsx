import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import PatientsList from "./pages/patientslist/PatientsList";
import PatientProfile from "./pages/patient/PatientProfile";

// Створюємо основну структуру з Sidebar, який буде на всіх сторінках
function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar завжди на екрані */}
        <Sidebar />

        {/* Контент всіх сторінок */}
        <div style={{ marginLeft: "250px", width: "100%" }}> {/* Щоб Sidebar не перекривав контент */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/patient/doctor/:doctorId" element={<PatientsList />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
