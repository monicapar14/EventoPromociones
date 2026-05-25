import fs from 'fs'
import path from 'path'

const logPath = path.join(__dirname, '../logs/notificaciones.log')

// Crea la carpeta logs si no existe
const logDir = path.join(__dirname, '../logs')
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}

export const guardarLog = (mensaje: string) => {
    const fecha = new Date().toLocaleString('es-GT')
    const linea = `[${fecha}] ${mensaje}\n`
    
    fs.appendFileSync(logPath, linea, 'utf8')
    console.log(linea)
}