import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss'; // Import styles

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="image-section"></div>
      <div className="content-section">
        <h1>Welcome to the Doctor Service</h1>
        <p>Цей сервіс допоможе лікарям ефективно керувати своїми пацієнтами та медичними даними.</p>
        <div className="button-container">
          <Link to="/login">
            <button className="action-button">Увійти як лікар</button>
          </Link>
          <Link to="/register">
            <button className="action-button">Зареєстувати лікаря</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
