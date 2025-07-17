// /src/paginas/Login.jsx
import React from 'react';
import Formulario from '../componentes/Formulario';
import '../styles/componentes/Login.css';
import cenesturBlanco from '../assets/CENESTURBLANCO.png';

const Login = () => {
  return (
    <>
      {/* Banner Principal */}
      <div className="banner gradient-animated">
        
        {/* Contenedor del Logo Institucional */}
        <div className="logo-container">
          <img 
          src={cenesturBlanco} 
          alt="Logo Cenestur"
          className="img-fluid logo-image logo-animated" 
          />
        </div>

        {/* Elementos Decorativos Flotantes */}
        <div className="floating-elements">
          <div className="floating-circle floating-circle-1 float-element"></div>
          <div className="floating-circle floating-circle-2 float-element-reverse"></div>
          <div className="floating-circle floating-circle-3 float-element-slow"></div>
          <div className="floating-circle floating-circle-4 float-element"></div>
          <div className="floating-circle floating-circle-5 float-element-reverse"></div>
        </div>

        {/* Efecto Shimmer */}
        <div className="shimmer-effect"></div>
      </div>

      {/* Contenedor Principal del Login */}
      <div className="login-container">
        
        {/* Contenedor del Formulario */}
        <div className="form-container">
          <Formulario />
        </div>
      </div>
    </>
  );
};

export default Login;