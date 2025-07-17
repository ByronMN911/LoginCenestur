// main.jsx - Punto de entrada de la aplicación React

// Importación de React Router para manejar navegación entre páginas
import { BrowserRouter } from "react-router-dom";

// Importación de ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';

// Importación de estilos de Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

// Importación de JavaScript de Bootstrap para componentes interactivos
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importación del componente principal de la aplicación
import App from './App.jsx'

// Creación del root de React en el elemento con id 'root' del HTML
// y renderizado de la aplicación envuelta en BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  // BrowserRouter habilita el enrutamiento basado en la URL del navegador
  <BrowserRouter>
    {/* Componente principal que contiene todas las rutas */}
    <App />
  </BrowserRouter>
);