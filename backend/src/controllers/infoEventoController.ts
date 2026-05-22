import { Request, Response } from 'express'
import pool from '../db'

//obtener la cantidad de cupos disponibles para el evento
export const getCupos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT cupo_maximo FROM evento_cupo WHERE id_evento = 1') 
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los cupos:', error)
    res.status(500).json({ message: 'Error al obtener los cupos' })
  }
}