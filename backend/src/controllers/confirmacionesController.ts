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