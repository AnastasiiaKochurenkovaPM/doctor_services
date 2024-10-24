import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PatientProfile.scss'; // Імпортуйте ваш SCSS файл

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [newCondition, setNewCondition] = useState('');
  const [newTreatmentPlan, setNewTreatmentPlan] = useState('');
  const [medications, setMedications] = useState([{ name: '', dosage: '', duration: '' }]); // Стан для нових препаратів
  const [expandedIndex, setExpandedIndex] = useState(null); // Додаємо стан для розгортання

  // Поля для редагування основної інформації пацієнта
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAddress] = useState('');

  useEffect(() => {
    // Отримання даних пацієнта
    axios.get(`/api/patient/${id}`)
      .then((response) => {
        const patientData = response.data;
        setPatient(patientData);

        // Встановлюємо значення полів для редагування
        setFirstname(patientData.firstname);
        setLastname(patientData.lastname);
        setPhone(patientData.phone);
        setEmail(patientData.email);
        setAddress(patientData.adress);
      })
      .catch((error) => {
        console.error('Error fetching patient profile:', error);
      });
  }, [id]);

  const handleMedicationChange = (e, index, medIndex) => {
    const updatedHistory = [...patient.medicalHistory];
    updatedHistory[index].medications[medIndex][e.target.name] = e.target.value;
    setPatient({ ...patient, medicalHistory: updatedHistory });
  };

  const handleAddMedication = (index) => {
    const updatedHistory = [...patient.medicalHistory];
    updatedHistory[index].medications.push({ name: '', dosage: '', duration: '' });
    setPatient({ ...patient, medicalHistory: updatedHistory });
  };

  const handleConditionChange = (e, index) => {
    const updatedHistory = [...patient.medicalHistory];
    updatedHistory[index][e.target.name] = e.target.value;
    setPatient({ ...patient, medicalHistory: updatedHistory });
  };

  const handleSave = () => {
    const updatedPatient = {
      firstname,
      lastname,
      phone,
      email,
      adress,
      medicalHistory: patient.medicalHistory
    };

    axios.put(`/api/patient/${id}`, updatedPatient)
      .then((response) => {
        setPatient(response.data);
        console.log('Patient profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating patient profile:', error);
      });
  };

  const handleAddNewRecord = () => {
    const newRecord = {
      condition: newCondition,
      treatmentPlan: newTreatmentPlan,
      date: new Date(),
      treatmentDate: new Date(),
      medications: medications
    };
    
    const updatedMedicalHistory = [...patient.medicalHistory, newRecord];
    setPatient({ ...patient, medicalHistory: updatedMedicalHistory });

    // Очищуємо поля після додавання
    setNewCondition('');
    setNewTreatmentPlan('');
    setMedications([{ name: '', dosage: '', duration: '' }]);
  };

  const handleNewMedicationChange = (e, index) => {
    const updatedMedications = [...medications];
    updatedMedications[index][e.target.name] = e.target.value;
    setMedications(updatedMedications);
  };

  const handleAddNewMedication = () => {
    setMedications([...medications, { name: '', dosage: '', duration: '' }]);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patient-profile-container">
      <h2>Пацієнт: {firstname} {lastname}</h2>
      <label>Ім'я:</label>
      <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <label>Прізвище:</label>
      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <label>Номер телефону:</label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <label>Електронна пошта:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Адреса:</label>
      <input type="text" value={adress} onChange={(e) => setAddress(e.target.value)} />

      <h3 className="medical-history">Історія хвороб:</h3>
      {patient.medicalHistory.length === 0 ? (
        <p>Історія хвороб відсутня.</p>
      ) : (
        <table className="medical-history-table">
          <thead>
            <tr>
              <th>Діагноз</th>
              <th>Рекомендації</th>
              <th>Дата встановлення діагнозу</th>
              <th>Дата початку лікування</th>
              <th>Препарати</th>
            </tr>
          </thead>
          <tbody>
            {patient.medicalHistory.map((record, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleExpand(index)}>
                  <td>{record.condition}</td>
                  <td>{record.treatmentPlan}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{new Date(record.treatmentDate).toLocaleDateString()}</td>
                  <td>
                    {record.medications.map((med, medIndex) => (
                      <div key={medIndex}>
                        <input
                          type="text"
                          name="name"
                          value={med.name}
                          onChange={(e) => handleMedicationChange(e, index, medIndex)}
                          placeholder="Назва препарату"
                        />
                        <input
                          type="text"
                          name="dosage"
                          value={med.dosage}
                          onChange={(e) => handleMedicationChange(e, index, medIndex)}
                          placeholder="Дозування"
                        />
                        <input
                          type="text"
                          name="duration"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(e, index, medIndex)}
                          placeholder="Тривалість прийому"
                        />
                      </div>
                    ))}
                    <button onClick={() => handleAddMedication(index)}>Додати препарат</button>
                  </td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="5">
                      <h4>Редагувати діагноз та рекомендації:</h4>
                      <input
                        type="text"
                        name="condition"
                        value={record.condition}
                        onChange={(e) => handleConditionChange(e, index)}
                        placeholder="Діагноз"
                      />
                      <input
                        type="text"
                        name="treatmentPlan"
                        value={record.treatmentPlan}
                        onChange={(e) => handleConditionChange(e, index)}
                        placeholder="Рекомендації"
                      />
                      <button onClick={handleSave}>Зберегти зміни</button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <h3>Додати новий запис до історії хвороб</h3>
      <input
        type="text"
        value={newCondition}
        onChange={(e) => setNewCondition(e.target.value)}
        placeholder="Діагноз"
      />
      <input
        type="text"
        value={newTreatmentPlan}
        onChange={(e) => setNewTreatmentPlan(e.target.value)}
        placeholder="Рекомендації"
      />
      <h4>Препарати:</h4>
      {medications.map((med, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={med.name}
            onChange={(e) => handleNewMedicationChange(e, index)}
            placeholder="Назва препарату"
          />
          <input
            type="text"
            name="dosage"
            value={med.dosage}
            onChange={(e) => handleNewMedicationChange(e, index)}
            placeholder="Дозування"
          />
          <input
            type="text"
            name="duration"
            value={med.duration}
            onChange={(e) => handleNewMedicationChange(e, index)}
            placeholder="Тривалість прийому"
          />
        </div>
      ))}
      <button onClick={handleAddNewMedication}>Додати інші препарати</button>
      <button onClick={handleAddNewRecord}>Зберегти новий запис</button>
    </div>
  );
};

export default PatientProfile;
