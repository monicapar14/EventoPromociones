import { Request, Response } from 'express'
import pool from '../db'

//obtener todos los productos disponibles
export const getProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT id_producto, nombre, descripcion, precio FROM Productos')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).json({ message: 'Error al obtener los productos' })
  }
}


//obtener tlos descuentos para los productos disponibles
export const getDescuentosProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT cant_min, precio_minimo, descuento FROM Descuentos_Productos')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los descuentos:', error)
    res.status(500).json({ message: 'Error al obtener los descuentos' })
  }
}