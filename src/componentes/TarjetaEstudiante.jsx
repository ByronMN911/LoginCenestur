import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importación de imágenes locales
import fotoByron from '../assets/Byron.jpg'
import gato from '../assets/gato1.png'
import usuario from '../assets/mujer1.png'

/**
 * Props:
 * @param {number} estudianteId - ID del estudiante a mostrar
 */

const TarjetaEstudiante = ({ estudianteId }) => {

  // Base de datos simulada de estudiantes 

  const estudiantes = {
    // Estudiante 1: Byron Melo
    1: {
      nombre: 'Byron Melo',
      foto: fotoByron,
      datosPersonales: {
        edad: '23 años',
        fechaNacimiento: '28/12/2001',
        ciudad: 'Quito, Ecuador',
        estadoCivil: 'Soltero'
      },
      contacto: {
        telefono: '+593 96 002 7228',
        email: 'byron.melo@cenestur.edu.ec',
        direccion: 'San Isidro de Puengasí'
      },
      educacion: {
        carrera: 'Desarrollo de Software',
        semestre: '2do Semestre',
        promedio: '8/10',
        universidad: 'Instituto Tecnológico Cenestur'
      },
      idiomas: ['Español (Nativo)', 'Inglés (Intermedio B2.2)'],
      fortalezas: ['Comunicación', 'Adaptabilidad', 'Liderazgo', 'Creatividad'],
      experiencia: [
        'Auxiliar de Bodega - Supermercado "Don Gato" (2023-2024)',
        'Mesero Polifuncional - Encebollados Cecilia (2022-2023)',
        'Tutor Particular -  Autónomo (2021)'
      ]
    },
    // Estudiante 2: Jessica Pinto
    2: { 
      nombre: 'Jessica Pinto',
      foto: gato,
      datosPersonales: {
        edad: '22 años',
        fechaNacimiento: '14/07/2003',
        ciudad: 'Guayaquil, Ecuador',
        estadoCivil: 'Soltera'
      },
      contacto: {
        telefono: '+593 98 765 4321',
        email: 'jessica.pinto@cenestur.edu.ec',
        direccion: 'Kennedy 456, Guayaquil'
      },
      educacion: {
        carrera: 'Diseño Gráfico',
        semestre: '3er Semestre',
        promedio: '9.5/10',
        universidad: 'Instituto Tecnológico Cenestur'
      },
      idiomas: ['Español (Nativo)', 'Inglés (Avanzado C2.1)', 'Italiano (Básico A2)'],
      fortalezas: ['Creatividad', 'Liderazgo', 'UX/UI Design', 'Comunicación'],
      experiencia: [
        'Diseñadora Freelance (2023-2024)',
        'Practicante Design Studio (2022-2023)',
        'Asistente de Marketing - Local Business (2022)'
      ]
    },
    // Estudiante 3: Mónica Torres
    3: {
      nombre: 'Mónica Torres',
      foto: usuario,
      datosPersonales: {
        edad: '23 años',
        fechaNacimiento: '10/11/2001',
        ciudad: 'Cuenca, Ecuador',
        estadoCivil: 'Viuda'
      },
      contacto: {
        telefono: '+593 97 555 1234',
        email: 'monica.torres@cenestur.edu.ec',
        direccion: 'Av. Solano 789, Cuenca'
      },
      educacion: {
        carrera: 'Administración de Empresas',
        semestre: '5to Semestre',
        promedio: '8.8/10',
        universidad: 'Instituto Tecnológico Cenestur'
      },
      idiomas: ['Español (Nativo)', 'Inglés (Intermedio B1.2)', 'Portugués (Básico A1.2)'],
      fortalezas: ['Análisis financiero', 'Gestión de proyectos', 'Negociación', 'Planificación'],
      experiencia: [
        'Analista Junior - Banco Del Pichincha (2023-2024)',
        'Asistente Administrativo - Ministerio de Educación (2022-2023)',
        'Voluntario - UNICEF Ecuador (2021-2022)'
      ]
    }
  };

  // Obtener datos del estudiante basado en el ID
  const estudiante = estudiantes[estudianteId];

  // Render condicional: Si no hay estudiante seleccionado, mostrar placeholder
  if (!estudiante) {
    return (
      <div className="card shadow-sm" style={{ maxHeight: '400px' }}>
        <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
          <div className="text-center text-muted">
            {/* Icono placeholder */}
            <i className="fa fa-user-circle" style={{ fontSize: '4rem', color: '#585AFA' }}></i>
            {/* Mensaje de instrucción */}
            <h5 className="mt-3">Selecciona un estudiante</h5>
            <p className="mb-0">Haz clic en un nombre de la barra lateral para ver su información</p>
          </div>
        </div>
      </div>
    );
  }

  // Render principal: Tarjeta completa del estudiante
  return (
    <div className="card shadow-lg border-0" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {/* Línea superior decorativa */}
      <div style={{ height: '4px', backgroundColor: '#585AFA' }}></div>
      
      <div className="card-body p-3 p-md-4">
        <div className="row">
          
          {/* COLUMNA IZQUIERDA - Información Personal y Contacto */}
          <div className="col-lg-4 col-md-5 mb-3 mb-lg-0">
            
            {/* Foto y Nombre del Estudiante */}
            <div className="text-center mb-3">
              <img 
                src={estudiante.foto} 
                alt={estudiante.nombre}
                className="rounded-circle shadow-sm"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  objectFit: 'cover',
                  border: '3px solid #585AFA'
                }}
              />
              <h4 className="mt-2 mb-0 fw-bold" style={{ color: '#585AFA', fontSize: '1.2rem' }}>
                {estudiante.nombre}
              </h4>
            </div>

            {/* Sección: Datos Personales */}
            <div className="mb-3">
              <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                <i className="fa fa-user me-2"></i>
                Datos Personales
              </h6>
              <div className="small">
                <p className="mb-1"><strong>Edad:</strong> {estudiante.datosPersonales.edad}</p>
                <p className="mb-1"><strong>Nacimiento:</strong> {estudiante.datosPersonales.fechaNacimiento}</p>
                <p className="mb-1"><strong>Ciudad:</strong> {estudiante.datosPersonales.ciudad}</p>
                <p className="mb-1"><strong>Estado Civil:</strong> {estudiante.datosPersonales.estadoCivil}</p>
              </div>
            </div>

            {/* Sección: Información de Contacto */}
            <div className="mb-3">
              <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                <i className="fa fa-phone me-2"></i>
                Contacto
              </h6>
              <div className="small">
                <p className="mb-1"><strong>Teléfono:</strong> {estudiante.contacto.telefono}</p>
                <p className="mb-1"><strong>Email:</strong> {estudiante.contacto.email}</p>
                <p className="mb-1"><strong>Dirección:</strong> {estudiante.contacto.direccion}</p>
              </div>
            </div>
          </div>

          {/* Línea Vertical Divisoria */}
          {/* Solo visible en pantallas grandes */}
          <div className="col-lg-1 d-none d-lg-block">
            <div 
              className="h-100 mx-auto" 
              style={{ 
                width: '4px', 
                backgroundColor: '#585AFA',
                
              }}
            ></div>
          </div>

          {/* COLUMNA DERECHA - Educación, Idiomas, Fortalezas y Experiencia */}
          <div className="col-lg-7 col-md-7">
            
            {/* Sección: Información Educativa */}
            <div className="mb-3">
              <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                <i className="fa fa-book me-2"></i>
                Educación
              </h6>
              <div className="small">
                <p className="mb-1"><strong>Carrera:</strong> {estudiante.educacion.carrera}</p>
                <p className="mb-1"><strong>Semestre:</strong> {estudiante.educacion.semestre}</p>
                <p className="mb-1"><strong>Promedio:</strong> {estudiante.educacion.promedio}</p>
                <p className="mb-1"><strong>Universidad:</strong> {estudiante.educacion.universidad}</p>
              </div>
            </div>

            {/* Fila con Idiomas y Fortalezas */}
            <div className="row mb-3">
              
              {/* Subsección: Idiomas */}
              <div className="col-md-6 mb-3 mb-md-0">
                <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                  <i className="fa fa-globe me-2"></i>
                  Idiomas
                </h6>
                <div className="small">
                  {/* Mapeo de idiomas como badges */}
                  {estudiante.idiomas.map((idioma, index) => (
                    <span key={index} className="badge me-1 mb-1" style={{ backgroundColor: '#6ecbdbff', fontSize: '0.7rem' }}>
                      {idioma}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subsección: Fortalezas */}
              <div className="col-md-6">
                <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                  <i className="fa fa-star me-2"></i>
                  Fortalezas
                </h6>
                <div className="small">
                  {/* Mapeo de fortalezas como badges verdes */}
                  {estudiante.fortalezas.map((fortaleza, index) => (
                    <span key={index} className="badge  me-1 mb-1" style={{ backgroundColor: '#5fce5bff', fontSize: '0.7rem' }}>
                      {fortaleza}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sección: Experiencia Laboral */}
            <div>
              <h6 className="fw-bold mb-2" style={{ color: '#585AFA', fontSize: '0.9rem' }}>
                <i className="fa fa-briefcase me-2"></i>
                Experiencia Laboral
              </h6>
              <div className="small">
                {/* Mapeo de experiencias como elementos de lista */}
                {estudiante.experiencia.map((exp, index) => (
                  <div key={index} className="mb-1 p-2 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="fa fa-circle me-2 text-primary" style={{ fontSize: '0.4rem' }}></i>
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior decorativa */}
      <div style={{ height: '4px', backgroundColor: '#585AFA' }}></div>
    </div>
  );
};

export default TarjetaEstudiante;