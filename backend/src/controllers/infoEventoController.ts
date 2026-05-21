import { Request, Response } from 'express'
import pool from '../db'

//obtener el cupo disponible para el evento
export const getCupo = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT cupo_maximo FROM evento_cupo WHERE req.params.id = 1')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener el cupo:', error)
    res.status(500).json({ message: 'Error al obtener el cupo' })
  }
}