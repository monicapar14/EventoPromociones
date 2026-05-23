import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from "./views/Formulario"
import Servicios from './views/Servicios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/servicios" element={<Servicios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App