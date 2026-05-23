import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from "./views/Formulario"
import Servicios from './views/Servicios'
import Productos from './views/Productos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App