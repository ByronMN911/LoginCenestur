// App.jsx - Componente principal que define las rutas de la aplicación

// Importación de componentes de React Router para definir rutas
import { Routes, Route } from 'react-router-dom'

// Importación de los componentes de las páginas
import Login from '../src/paginas/Login'
import Perfil from '../src/paginas/Perfil'

    
// Componente principal que define la estructura de rutas
function App() {
  return (
    // Routes es un contenedor que agrupa todas las rutas
    <Routes>
      {/* Ruta raíz "/" que renderiza el componente Login */}
      <Route path="/" element={<Login />} />
      
      {/* Ruta "/perfil" que renderiza el componente Perfil */}
      <Route path="/perfil" element={<Perfil />} />

    </Routes>
  )
}

// Exportación del componente para poder usarlo en otros archivos
export default App