import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from "./views/Formulario"
import Servicios from './views/Servicios'
import Productos from './views/Productos'
import Confirmacion from './views/Confirmacion'
import Exito from './views/ExitoEnvio'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path='/confirmacion' element={<Confirmacion />} />
        <Route path='/enviadosC' element={<Exito />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App