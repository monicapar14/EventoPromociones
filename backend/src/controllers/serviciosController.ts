import { Request, Response } from 'express'
import pool from '../db'

export const getServicios = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Servicios')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
    res.status(500).json({ message: 'Error al obtener los servicios' })
  }
}