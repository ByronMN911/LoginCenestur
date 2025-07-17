import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraLateral from '../componentes/BarraLateral';
import TarjetaEstudiante from '../componentes/TarjetaEstudiante';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/componentes/perfil-styles.css';

const Perfil = () => {
  // Estado para controlar colapso de la sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  // Estado para el estudiante actualmente seleccionado
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Estado para almacenar datos del usuario autenticado
  const [user, setUser] = useState(null);
  
  // Hook para navegación programática
  const navigate = useNavigate();

  // Efecto para verificar autenticación al montar el componente
  useEffect(() => {
    // Verificar tokens de autenticación en localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (!isLoggedIn || !userData) {
      // Si no está autenticado, redirigir al login
      navigate('/');
    } else {
      // Si está autenticado, cargar datos del usuario
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  // Efecto para manejar responsividad de la sidebar
  useEffect(() => {
    /*
     Función para ajustar la sidebar según el tamaño de pantalla
     */
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // En desktop (≥768px), mantener sidebar abierta por defecto
        setIsSidebarCollapsed(false);
      } else {
        // En móviles (<768px), mantener sidebar cerrada por defecto
        setIsSidebarCollapsed(true);
      }
    };

    // Ejecutar función al cargar la página
    handleResize();

    // Agregar listener para detectar cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);

    // Cleanup: remover listener al desmontar componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /*
   Función para alternar visibilidad de la sidebar, cambia entre estado colapsado y expandido
  */
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  /**
   * Maneja la selección de un estudiante mediante el ID del estudiante seleccionado
   */
  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
    // En dispositivos móviles, cerrar sidebar automáticamente después de seleccionar
    if (window.innerWidth < 768) {
      setIsSidebarCollapsed(true);
    }
  };

  /*
   Maneja el cierre de sesión y limpia localStorage y redirige al login
   */
  const handleLogout = () => {
    // Limpiar datos de autenticación del localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    // Redirigir a la página de login
    navigate('/');
  };

  // Render condicional: Mostrar loading mientras se verifica autenticación
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          {/* Spinner de carga */}
          <div className="spinner-border" style={{ color: '#585AFA' }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Render principal: Dashboard completo
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffffff' }}>
      
      {/* Componente Barra Lateral */}
      <BarraLateral 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        onStudentSelect={handleStudentSelect}
        selectedStudent={selectedStudent}
        onLogout={handleLogout}
      />

      {/* Contenido Principal */}
      <div 
        className="main-content"
        style={{
          // Margen dinámico basado en estado de sidebar y tamaño de pantalla
          marginLeft: window.innerWidth >= 768 && !isSidebarCollapsed ? '280px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh'
        }}
      >
        
        {/* Header Sticky - Siempre visible en la parte superior */}
        <div 
          className="sticky-top bg-white shadow-sm"
          style={{ 
            zIndex: 1030, // Z-index para mantenerlo sobre otros elementos
            borderBottom: '1px solid #dee2e6'
          }}
        >
          <div className="container-fluid p-4">
            <div className="row">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  
                  {/* Información del Header */}
                  <div className="mb-2 mb-md-0">
                    <h2 className="fw-bold mb-0" style={{ color: '#585AFA' }}>
                      <i className="fa fa-user-graduate me-2"></i>
                      Perfil del Estudiante
                    </h2>
                    {/* Mensaje de bienvenida con email del usuario */}
                    <small className="text-muted">
                      Bienvenido, {user.email}
                    </small>
                  </div>
                  
                  {/* Botón para Toggle de Sidebar */}
                  <div>
                    <button
                      className="btn btn-outline-info"
                      onClick={toggleSidebar}
                      style={{ 
                        borderColor: '#585AFA', 
                        color: '#585AFA',
                        minWidth: '140px'
                        
                      }}
                    >
                      {/* Icono y texto dinámico basado en estado de sidebar */}
                      <i className={`fa ${isSidebarCollapsed ? 'fa-bars' : 'fa-times'} me-2`}></i>
                      {isSidebarCollapsed ? 'Mostrar Menú' : 'Ocultar Menú'}
                    </button>
                  </div>
                </div>
                
                {/* Línea divisoria decorativa */}
                <hr style={{ borderColor: '#585AFA', opacity: 0.3, margin: '1rem 0 0 0' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal - Tarjeta del Estudiante */}
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              {/* Componente TarjetaEstudiante con ID del estudiante seleccionado */}
              <TarjetaEstudiante estudianteId={selectedStudent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;