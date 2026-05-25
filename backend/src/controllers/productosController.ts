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


//obtener los descuentos para los productos disponibles
export const getDescuentosProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT id_consulta, campoC, campoP, descuento FROM desc_consultas WHERE id_consulta = 2')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los descuentos:', error)
    res.status(500).json({ message: 'Error al obtener los descuentos' })
  }
}

//agregar los productos que selecciono el usuario
export const agregarProducto = async (req: Request, res: Response) => {
  try {
    const { id_confirmacion, id_producto } = req.body

    const [rows] = await pool.query(
      'INSERT INTO productos_seleccionados (id_confirmacion, id_producto) VALUES (?, ?)',
      [id_confirmacion, id_producto]
    )

    res.status(201).json({ message: 'Productos ingresados', result: rows })
  } catch (error) {
    console.log('Error al insertar los productos', error)
    res.status(500).json({ message: 'Error al insertar los productos' })
  }
}

//obtener los seleccionados
export const getProductosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [productos]: any = await pool.query(
      'SELECT a.id_producto, a.nombre, a.precio FROM productos a, productos_seleccionados b, confirmacion c WHERE a.id_producto = b.id_producto AND c.id_confirmacion = ? AND b.id_confirmacion = c.id_confirmacion',
      [id]
    )

    res.json({productos})

  } catch (error) {
    console.error('Error al obtener los productos seleccionados:', error)
    res.status(500).json({ message: 'Error al obtener los productos seleccionados' })
  }
}

export const updateProductos = async (req: Request, res: Response) => {
    const { id_confirmacion, productos } = req.body

    try {
        await pool.query(
            'DELETE FROM productos_seleccionados WHERE id_confirmacion = ?',
            [id_confirmacion]
        )

        const insertar = productos.map((id_producto: number) =>
            pool.query(
                'INSERT INTO productos_seleccionados (id_confirmacion, id_producto) VALUES (?, ?)',
                [id_confirmacion, id_producto]
            )
        )

        await Promise.all(insertar)

        res.json({ message: 'Productos actualizados' })

    } catch (error) {
        console.error('Error al actualizar productos:', error)
        res.status(500).json({ message: 'Error al actualizar productos' })
    }
}