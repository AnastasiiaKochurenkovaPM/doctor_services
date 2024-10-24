import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './PatientsList.scss'; // Імпорт стилів

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = localStorage.getItem('doctorId');

        if (!doctorId) {
          console.error("Doctor ID not found");
          return;
        }

        const response = await axios.get(`/api/patient/doctor/${doctorId}`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to calculate the patient's age based on their birthdate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="patients-list-container">
      <h1>Мої пацієнти</h1>
      {patients.length === 0 ? (
        <p>У вас поки що немає пацієнтів.</p> // Message when no patients are found
      ) : (
        <table className="patients-table">
          <thead>
            <tr>
              <th>Пацієнт</th>
              <th>Вік</th>
              <th>Адреса</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>
                  <Link to={`/patient/${patient._id}`}>
                    {patient.firstname} {patient.lastname}
                  </Link>
                </td>
                <td>{calculateAge(patient.birthDate)}</td>
                <td>{patient.adress || "адресу не вказано"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsList;
