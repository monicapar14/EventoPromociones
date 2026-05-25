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


//obtener los descuentos para los servicios disponibles
export const getDescuentosServicios = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT id_consulta, campoC, campoP, descuento FROM desc_Consultas WHERE id_consulta = 1')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los descuentos:', error)
    res.status(500).json({ message: 'Error al obtener los descuentos' })
  }
}

//agregar los servicios que selecciono el usuario
export const agregarServicio = async (req: Request, res: Response) => {
  try {
    const { id_confirmacion, id_servicio } = req.body

    const [rows] = await pool.query(
      'INSERT INTO Servicios_seleccionados (id_confirmacion, id_servicio) VALUES (?, ?)',
      [id_confirmacion, id_servicio]
    )

    res.status(201).json({ message: 'Servicios ingresados', result: rows })
  } catch (error) {
    console.log('Error al insertar los servicios', error)
    res.status(500).json({ message: 'Error al insertar los servicios' })
  }
}

//obtener los seleccionados
export const getServiciosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [servicios]: any = await pool.query(
      'SELECT a.id_servicio, a.nombre, a.precio FROM Servicios a, Servicios_seleccionados b, Confirmacion c WHERE a.id_servicio = b.id_servicio AND c.id_confirmacion = ? AND b.id_confirmacion = c.id_confirmacion',
      [id]
    )

    res.json({servicios})

  } catch (error) {
    console.error('Error al obtener los servicios seleccionados:', error)
    res.status(500).json({ message: 'Error al obtener los servicios seleccionados' })
  }
}

export const updateServicios = async (req: Request, res: Response) => {
    const { id_confirmacion, servicios } = req.body

    try {
        await pool.query(
            'DELETE FROM Servicios_seleccionados WHERE id_confirmacion = ?',
            [id_confirmacion]
        )

        const insertar = servicios.map((id_servicio: number) =>
            pool.query(
                'INSERT INTO Servicios_seleccionados (id_confirmacion, id_servicio) VALUES (?, ?)',
                [id_confirmacion, id_servicio]
            )
        )

        await Promise.all(insertar)

        res.json({ message: 'Servicios actualizados' })

    } catch (error) {
        console.error('Error al actualizar servicios:', error)
        res.status(500).json({ message: 'Error al actualizar servicios' })
    }
}