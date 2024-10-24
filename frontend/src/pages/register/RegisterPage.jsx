import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specialization: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-column">
          <h2>СТВОРИТИ АКАУНТ ЛІКАРЯ</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="Ім'я" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Прізвище" value={formData.lastName} onChange={handleChange} required />
            <input type="text" name="specialization" placeholder="Спеціалізація" value={formData.specialization} onChange={handleChange} required />
            <input type="tel" placeholder="Номер телефону" />
            <input type="email" name="email" placeholder="Електронна пошта" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />

            <button type="submit">Зареєструватися</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
