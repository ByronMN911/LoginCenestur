import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Props:
 * @param {boolean} isCollapsed - Estado de colapso de la sidebar
 * @param {function} toggleSidebar - Función para alternar visibilidad
 * @param {function} onStudentSelect - Callback para selección de estudiante
 * @param {number} selectedStudent - ID del estudiante actualmente seleccionado
 * @param {function} onLogout - Callback para manejar el cierre de sesión
 */
const BarraLateral = ({ 
  isCollapsed, 
  toggleSidebar, 
  onStudentSelect, 
  selectedStudent, 
  onLogout 
}) => {
  // Estado para controlar la visibilidad del modal de confirmación de logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Datos estáticos de estudiantes 
  const estudiantes = [
    { id: 1, nombre: 'Byron Melo' },
    { id: 2, nombre: 'Jessica Pinto' },
    { id: 3, nombre: 'Mónica Torres' }
  ];

  
   //Maneja el clic en el botón de cerrar sesión para mostrar el modal de confirmación
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  
   //Confirma el cierre de sesión que cierra el modal y ejecuta la función de logout
  
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  
    //Cancela el cierre de sesión, por lo tanto cierra el modal sin ejecutar logout
   
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Overlay para Móviles */}
      {/* Capa semitransparente que se muestra cuando la sidebar está abierta en móviles */}
      {!isCollapsed && (
        <div 
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          /* Cierra sidebar al hacer clic fuera, en la parte oscura de la pantalla
           que aparece cuando despliegas la bara lateral de navegación
           */
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar Principal */}
      <div 
        className={`position-fixed top-0 start-0 h-100 transition-all duration-300 ${
          isCollapsed ? 'translate-x-n100' : 'translate-x-0'
        } d-md-block`}
        style={{ 
          width: '280px',
          backgroundColor: '#585AFA', 
          zIndex: 1045,
          // Transformación para animación de deslizamiento
          transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Contenedor Principal de la Sidebar */}
        <div className="d-flex flex-column h-100 text-white">
          
          {/* SECCIÓN 1: Logo del Instituto */}
          <div className="p-4 text-center border-bottom border-light">
            {/* Contenedor circular para el icono */}
            <div 
              className="bg-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: '80px', height: '80px' }}
            >
              <i className="fa fa-graduation-cap" style={{ fontSize: '2rem', color: '#585AFA'}}></i>
            </div>
            {/* Texto del instituto */}
            <small className="fw-bold">Instituto Tecnológico</small>
            <h5 className="mb-0 fw-bold">CENESTUR</h5>
          </div>

          {/* SECCIÓN 2: Información del Grupo */}
          <div className="p-4 text-center border-bottom border-light">
            {/* Pill badge con información del grupo */}
            <div className="bg-white bg-opacity-20 rounded-pill py-2 px-3">
              <h6 className="mb-0 fw-bold text-black">
                <i className="fa fa-users me-2"></i>
                Grupo N1
              </h6>
            </div>
          </div>

          {/* SECCIÓN 3: Lista de Estudiantes */}
          <div className="flex-grow-1 p-3 border-bottom border-light mt-2">
            {/* Encabezado de la sección */}
            <h6 className="text-center mb-4 fw-bold">
              <i className="fa fa-user-graduate me-2"></i>
              Estudiantes
            </h6>
            
            {/* Lista de botones de estudiantes */}
            <div className="d-grid gap-3">
              {estudiantes.map((estudiante) => (
                <button  
                  key={estudiante.id}
                  className={`btn btn-outline-light text-start ${
                    selectedStudent === estudiante.id ? 'active' : ''
                  }`}
                  style={{
                    // Estilo condicional para estudiante seleccionado
                    backgroundColor: selectedStudent === estudiante.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderColor: 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => onStudentSelect(estudiante.id)}
                >
                  <i className="fa fa-user me-2"></i>
                  {estudiante.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN 4: Botón de Cerrar Sesión */}
          <div className="p-4">
            <button
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
              onClick={handleLogoutClick}
            >
              <i className="fa fa-sign-out-alt me-2"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación para Cerrar Sesión */}
      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              
              {/* Header del Modal */}
              <div className="modal-header bg-danger text-white border-0">
                <h5 className="modal-title d-flex align-items-center">
                  <i className="fa fa-exclamation-triangle me-2"></i>
                  Confirmar Cierre de Sesión
                </h5>
              </div>
              
              {/* Cuerpo del Modal */}
              <div className="modal-body text-center py-4">
                {/* Icono central */}
                <div className="mb-3">
                  <i className="fa fa-sign-out-alt text-danger" style={{ fontSize: '3rem' }}></i>
                </div>
                {/* Mensaje de confirmación */}
                <h6 className="mb-3">¿Estás seguro que deseas cerrar sesión?</h6>
                <p className="text-muted mb-0">
                  Si aceptas tendrás que volver a iniciar sesión de nuevo.
                </p>
              </div>
              
              {/* Footer del Modal con botones */}
              <div className="modal-footer border-0 justify-content-center">
                {/* Botón Cancelar */}
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleLogoutCancel}
                >
                  <i className="fa fa-times me-2"></i>
                  Cancelar
                </button>
                {/* Botón Confirmar */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogoutConfirm}
                >
                  <i className="fa fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop del Modal */}
      {/* Fondo semitransparente del modal */}
      {showLogoutModal && (
        <div 
          className="modal-backdrop fade show" 
          style={{ zIndex: 1050 }}
        />
      )}
    </>
  );
};

export default BarraLateral;