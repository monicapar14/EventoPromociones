import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db'
import serviciosRouter from './routes/servicios'
import productosRouter from './routes/productos'
import confirmacionesRouter from './routes/confirmaciones'
import infoEventoRouter from './routes/infoEvento'
import confirmaciones from './routes/confirmaciones'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

// Rutas de servicios
app.use('/api/servicios', serviciosRouter)

//Ruta de productos
app.use('/api/productos', productosRouter)

//Ruta de confirmaciones
app.use('/api/confirmaciones', confirmacionesRouter)

//Ruta de cupos
app.use('/api/cupos', infoEventoRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})