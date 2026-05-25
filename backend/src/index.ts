import express from 'express'

const app = express()

const PORT = Number(process.env.PORT) || 8080

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})