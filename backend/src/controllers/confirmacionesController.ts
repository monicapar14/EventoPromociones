import { Request, Response } from 'express'
import pool from '../db'

//obtener las confirmaciones que van
export const getCantConfirmaciones = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT count(*) as cantidad FROM confirmacion') // quitar tilde 
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener las confirmaciones:', error)
    res.status(500).json({ message: 'Error al obtener las confirmaciones' })
  }
}

export const agregarConfirmacion = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, email, fecha_hora } = req.body

    if (!nombres || !apellidos || !email) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const fechaConfirmacion = fecha_hora ? new Date(fecha_hora) : new Date()
    const [rows] = await pool.query(
      'INSERT INTO confirmacion (nombres, apellidos, email, fecha_confirmacion, descuento_servicio) VALUES (?, ?, ?, ?, ?)',
      [nombres, apellidos, email, fechaConfirmacion, 0]
    )

    res.status(201).json({ message: 'Confirmación creada', result: rows })
  } catch (error) {
    console.log('Error al insertar los datos', error)
    res.status(500).json({ message: 'Error al insertar los datos' })
  }
}