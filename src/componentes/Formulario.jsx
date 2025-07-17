import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
  // ========== ESTADOS DEL COMPONENTE ==========
  // Estados para controlar los campos del formulario y su validación
  // Utilizamos el patrón de estado controlado de React para un manejo consistente
  
  const [email, setEmail] = useState(''); // Estado para el valor del campo email
  const [password, setPassword] = useState(''); // Estado para el valor del campo contraseña
  
  // Estados para manejo de errores de validación
  // Separamos los errores por campo para un feedback granular al usuario
  const [emailError, setEmailError] = useState(''); // Mensaje de error específico para email
  const [passwordError, setPasswordError] = useState(''); // Mensaje de error específico para contraseña
  
  // Estado booleano para control visual del estado de validación del email
  // Permite mostrar iconos de validación y aplicar clases CSS condicionales
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  // Estado para almacenar la lista de usuarios cargados desde el archivo CSV
  // Utilizamos un array de objetos para facilitar las operaciones de búsqueda
  const [users, setUsers] = useState([]);

  // Hook de React Router para navegación programática
  // Permite redirigir al usuario después de una autenticación exitosa
  const navigate = useNavigate();

  // ========== CARGA DE DATOS DESDE ARCHIVO CSV ========================
  // Función asíncrona para cargar usuarios desde un archivo CSV en la carpeta public
  // Implementa manejo de errores y parsing manual del CSV para mayor control
  const loadUsers = async () => {
    try {
      // Realizamos una petición HTTP al archivo CSV ubicado en la carpeta public
      const response = await fetch('/usuarios.csv');
      
      // Verificamos si la respuesta HTTP es exitosa 
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.status}`);
      }
      
      // Convertimos la respuesta a texto plano para procesar el contenido CSV
      const csvText = await response.text();
      
      // Dividimos el contenido en líneas, eliminando espacios en blanco al inicio y final
      const lines = csvText.trim().split('\n');
      
      // Array temporal para almacenar los datos procesados
      const usersData = [];
      
      // Iteramos sobre cada línea del archivo CSV
      for (let i = 0; i < lines.length; i++) {
        // Dividimos cada línea por comas (formato CSV básico)
        // Asumimos formato: email,password
        const [email, password] = lines[i].split(',');
        
        // Validamos que ambos campos existan antes de agregar al array
        if (email && password) {
          usersData.push({ 
             // Eliminamos espacios en blanco para email y contraseña
            email: email.trim(),   
            password: password.trim() 
          });
        }
      }
      
      // Actualizamos el estado con los datos procesados
      setUsers(usersData);
      
    } catch (error) {
      // Manejo de errores: registramos en consola para debugging
      console.error('Error al cargar usuarios:', error);
    }
  };

  // ========== EFFECT HOOK PARA CARGA INICIAL ==========
  // useEffect se ejecuta una sola vez al montar el componente (array de dependencias vacío)
  // Garantiza que los usuarios se carguen antes de que el usuario interactúe con el formulario
  useEffect(() => {
    loadUsers();
  }, []); // Array vacío que permite ejecutar el efecto solo una vez al montar

  // ========== VALIDACIÓN DE EMAIL ==========
  // Expresión regular para validar el formato específico del email institucional

  const emailPattern = /^[a-zA-Z]+\.[a-zA-Z]+@cenestur\.edu\.ec$/;

  // Función para manejar cambios en el campo email con validación en tiempo real
  // Se ejecuta en cada tecla presionada (evento onChange)
  const handleEmailChange = (e) => {
    const value = e.target.value; // Obtenemos el valor actual del input
    setEmail(value); // Actualizamos el estado del email

    // Validación en tiempo real con múltiples condiciones
    if (value === '') {
      // Campo vacío: mensaje de obligatoriedad
      setEmailError('El campo de correo electrónico es obligatorio');
      setIsEmailValid(false);
    } else if (!emailPattern.test(value)) {
      // Formato incorrecto: mensaje específico sobre el formato institucional
      setEmailError('El formato del correo institucional es incorrecto');
      setIsEmailValid(false);
    } else {
      // Validación exitosa: limpiamos errores y marcamos como válido
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  // Función para manejar cambios en el campo contraseña
  // Más simple que el email ya que la validación principal es en el submit
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Limpiamos errores de contraseña cuando el usuario empieza a escribir
    if (passwordError) {
      setPasswordError('');
    }
  };

  // ========== VALIDACIÓN DE CREDENCIALES ==========
  // Función para verificar si las credenciales proporcionadas son válidas
  // Utiliza el método find() para buscar coincidencias exactas
  const validateCredentials = (email, password) => {
    // Buscamos un usuario que coincida exactamente con email Y contraseña
    // find() retorna el primer elemento que cumple la condición, o undefined si no encuentra
    return users.find(user => user.email === email && user.password === password);
  };

  // ========== MANEJO DEL ENVÍO DEL FORMULARIO ==========
  // Función principal para procesar el submit del formulario
  // Implementa validación completa, autenticación y navegación
  const handleSubmit = (e) => {
    // Prevenir el comportamiento por defecto del formulario que es recargar la página
    e.preventDefault();
    
    // Validación de campos obligatorios
    // Verificamos ambos campos y mostramos errores específicos
    if (!email || !password) {
      if (!email) setEmailError('El campo de correo electrónico es obligatorio');
      if (!password) setPasswordError('El campo de contraseña es obligatorio');
      return; // Salimos de la función sin procesar
    }

    // Intentamos validar las credenciales contra la base de datos cargada(archivo csv)
    const user = validateCredentials(email, password);
    
    if (user) {
      // ========== AUTENTICACIÓN EXITOSA ==========
      console.log('Usuario autenticado correctamente');
      
      // Guardamos información del usuario en localStorage para persistencia
      // JSON.stringify convierte el objeto a string para almacenamiento
      localStorage.setItem('user', JSON.stringify(user));
      
      // Marcamos al usuario como autenticado
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navegación programática al perfil del usuario
      navigate('/perfil');
      
    } else {
      // ========== AUTENTICACIÓN FALLIDA ==========
      // Mostramos error genérico por seguridad (no especificamos si es email o contraseña)
      setPasswordError('La contraseña es incorrecta o el usuario no existe');
    }
  };

  // ========== RENDER DEL COMPONENTE UTILIZANDO BOOTSTRAP ==========
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center p-3">

      <div className="row w-100 justify-content-center">
        
        {/* Columna responsiva para el formulario utilizando solo bootstrap */}
      
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          {/*
            Sistema de breakpoints de Bootstrap para diferentes tamaños de pantalla (responsive)
            col-12: 100% en móviles (xs)
            col-sm-10: 83.33% en tablets pequeñas (≥576px)
            col-md-8: 66.67% en tablets (≥768px)
            col-lg-6: 50% en laptops (≥992px)
            col-xl-5: 41.67% en desktops (≥1200px)
            col-xxl-4: 33.33% en pantallas muy grandes (≥1400px)
          */}
          
          {/* Card del formulario*/}
          <div className="card shadow-lg border-0 formulario-card">
            
            <div className="card-body p-4 p-sm-5">
              {/*
                p-4: Padding de 1.5rem en móviles
                p-sm-5: Padding de 3rem en tablets y superiores
              */}
              
              {/* Título de la tarjeta */}
              <div className="row">
                <div className="col-12">
                  <h2 className="text-center fw-bold mb-4 formulario-title">
                    Iniciar sesión
                  </h2>
                </div>
              </div>

              {/* Formulario con grid interno */}
              <form onSubmit={handleSubmit}>
                {/*
                  onSubmit: utilizamos la función handleSubmit para manejar el envío del formulario
                  Se ejecuta cuando se presiona el botón para iniciar sesión
                */}
                
                {/* ========== CAMPO DE CORREO INSTITUCIONAL ========== */}
                <div className="row mb-4">
                  <div className="col-12">
                  
                    <label htmlFor="email" className="form-label text-start d-block fw-semibold">
                      Correo institucional
                    </label>
                    
                    {/* Contenedor posicionado para el ícono de validación */}
                    <div className="position-relative">
                      
                      <input
                        type="email"
                        className={`form-control formulario-input ${emailError ? 'is-invalid' : isEmailValid ? 'is-valid' : ''}`}
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        pattern="^[a-zA-Z]+\.[a-zA-Z]+@cenestur\.edu\.ec$"
                        placeholder="nombre.apellido@cenestur.edu.ec"
                      />

                      {/* Ícono de validación exitosa que solo se muestra si isEmailValid es true */}
                      {isEmailValid && (
                        <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                          <i className="fa fa-check text-success"></i>
                        </div>
                      )}
                    </div>
                    
                    {/* Mensaje de error para email que solo se muestra si hay error */}
                    {emailError && (
                      <div className="text-danger mt-2 formulario-error">
                        <i className="fa fa-exclamation-triangle me-2"></i>
                        <span>{emailError}</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* ========== CAMPO DE CONTRASEÑA ========== */}
                <div className="row mb-4">
                  <div className="col-12">
                    
                    {/* Header del campo contraseña con link de recuperación */}
                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <label htmlFor="password" className="form-label fw-semibold mb-0">
                        Contraseña
                      </label>
                      <a href="#" className="text-decoration-none formulario-link">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    
                    <input
                      type="password"
                      className={`form-control formulario-input ${passwordError ? 'is-invalid' : ''}`}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      minLength="5"
                      maxLength="15"
                      placeholder="Ingresa tu contraseña"
                    />

                    {/* Mensaje de error para contraseña */}
                    {passwordError && (
                      <div className="text-danger mt-2 formulario-error">
                        <i className="fa fa-exclamation-triangle me-2"></i>
                        <span>{passwordError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ========== CHECKBOX RECORDARME ========== */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="form-check">

                      <input
                        type="checkbox"
                        className="form-check-input formulario-checkbox"
                        id="rememberMe"
                      />
                      <label className="form-check-label formulario-checkbox-label" htmlFor="rememberMe">
                        Recordarme en este dispositivo
                      </label>
                    </div>
                  </div>
                </div>

                {/* ========== BOTÓN DE ENVÍO ========== */}
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold formulario-btn"
                    >
                      Iniciar sesión
                    </button>

                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;