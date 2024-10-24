import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './DoctorProfile.scss'; // Імпорт стилів

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after deletion
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/doctor/${id}`);
        setDoctorData(response.data);
      } catch (error) {
        setError("Failed to load doctor data.");
      }
    };

    fetchDoctorData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/doctor/${id}`, doctorData);
      setSuccess("Changes saved successfully.");
      setIsEditing(false);
    } catch (error) {
      setError("Failed to save changes.");
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/doctor/${id}`);
        setSuccess("Profile deleted successfully.");
        navigate('/'); // Redirect after deletion (you can change the path)
      } catch (error) {
        setError("Failed to delete profile.");
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Профіль лікаря</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {isEditing ? (
        <div>
          <label>Ім'я:</label>
          <input
            type="text"
            name="firstName"
            value={doctorData.firstName}
            onChange={handleInputChange}
          />
          <label>Прізвище:</label>
          <input
            type="text"
            name="lastName"
            value={doctorData.lastName}
            onChange={handleInputChange}
          />
          <label>Електронна пошта:</label>
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleInputChange}
          />
          <label>Спеціалізація:</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleInputChange}
          />
          <label>Номер телефону:</label>
          <input
            type="text"
            name="phone"
            value={doctorData.phone}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Ім'я:</strong> {doctorData.firstName}</p>
          <p><strong>Прізвище:</strong> {doctorData.lastName}</p>
          <p><strong>Електронна пошта:</strong> {doctorData.email}</p>
          <p><strong>Спеціалізація:</strong> {doctorData.specialization}</p>
          <p><strong>Номер телефону:</strong> {doctorData.phone}</p>
          <button onClick={() => setIsEditing(true)}>Редагувати профіль</button>
          <button onClick={handleDeleteProfile}>Видалити профіль</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
