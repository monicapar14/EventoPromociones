import { Request, Response } from 'express'
import pool from '../db'

//obtener todos los servicios disponibles
export const getServicios = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT id_servicio, nombre, descripcion, precio FROM Servicios')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
    res.status(500).json({ message: 'Error al obtener los servicios' })
  }
}


//obtener tlos descuentos para los servicios disponibles
export const getDescuentosServicios = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT cant_min, precio_minimo, descuento FROM Descuentos_Servicios')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los descuentos:', error)
    res.status(500).json({ message: 'Error al obtener los descuentos' })
  }
}