import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db'
import serviciosRouter from './routes/servicios'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

app.use('/api/servicios', serviciosRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})