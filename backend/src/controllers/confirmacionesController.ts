import { Request, Response } from 'express'
import pool from '../db'
import fs from 'fs'
import path from 'path'
import { guardarLog } from '../logs'

//obtener las confirmaciones que van
export const getCantConfirmaciones = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT count(*) as cantidad FROM Confirmacion WHERE estado = 1') 
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener las confirmaciones:', error)
    res.status(500).json({ message: 'Error al obtener las confirmaciones' })
  }
}

//obtener cupo
export const getcupo = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT cupo_maximo FROM Evento_Cupo WHERE id_evento = 1') 
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener el cupo:', error)
    res.status(500).json({ message: 'Error al obtener el cupo' })
  }
}


//obtener las confirmaciones info
export const getConfirmaciones = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [confirmacion]: any = await pool.query(
      'SELECT * FROM Confirmacion WHERE id_confirmacion = ?',
      [id]
    )

    res.json({ confirmacion: confirmacion[0]})

  } catch (error) {
    console.error('Error al obtener la confirmacion:', error)
    res.status(500).json({ message: 'Error al obtener la confirmacion' })
  }
}

//obtener el id temporal
export const idTemporal = async (req: Request, res: Response) => {
    try {
        const [result]: any = await pool.query('INSERT INTO Id_Temp () VALUES ()')
        res.json({ idSesion: result.insertId })
    } catch (error) {
        console.error('Error al crear el id:', error)
        res.status(500).json({ message: 'Error al crear el id' })
    }
}

export const agregarConfirmacion = async (req: Request, res: Response) => {
  try {
    const { id_confirmacion, nombres, apellidos, email, fecha_hora, descuento_servicio, descuento_producto, estado } = req.body

    const fechaConfirmacion = fecha_hora ? new Date(fecha_hora) : new Date()
    const [rows] = await pool.query(
      'INSERT INTO Confirmacion (id_confirmacion, nombres, apellidos, email, fecha_confirmacion, descuento_servicio, descuento_producto, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id_confirmacion, nombres, apellidos, email, fechaConfirmacion, descuento_servicio, descuento_producto, estado]
    )

    res.status(201).json({ message: 'Confirmación creada', result: rows })
  } catch (error) {
    console.log('Error al insertar los datos', error)
    res.status(500).json({ message: 'Error al insertar los datos' })
  }
}

//update datos
export const updateDatos = async (req: Request, res: Response) => {
  try {
    const { id_confirmacion, nombres, apellidos, email, fecha_hora } = req.body

    const fechaConfirmacion = fecha_hora ? new Date(fecha_hora) : new Date()

    const [rows] = await pool.query(
      'UPDATE Confirmacion set nombres = ?, apellidos = ?, email = ?, fecha_confirmacion = ? WHERE id_confirmacion = ?',
      [nombres, apellidos, email, fechaConfirmacion, id_confirmacion]
    )

    res.status(201).json({ message: 'Update realizado', result: rows })
  } catch (error) {
    console.log('Error al insertar el datos', error)
    res.status(500).json({ message: 'Error al insertar el datos' })
  }
}

//agregar el descuento de servicios
export const updateDescuentoS = async (req: Request, res: Response) => {
  try {
    const { descuento_servicio, id_confirmacion} = req.body

    const [rows] = await pool.query(
      'UPDATE Confirmacion SET descuento_servicio = ? WHERE id_confirmacion = ?',
      [descuento_servicio, id_confirmacion]
    )

    res.status(201).json({ message: 'Update realizado', result: rows })
  } catch (error) {
    console.log('Error al insertar el descuento de servicios', error)
    res.status(500).json({ message: 'Error al insertar el descuento de servicios' })
  }
}

//agregar el derscuento de Productos
export const updateDescuentoP = async (req: Request, res: Response) => {
  try {
    const { descuento_producto, id_confirmacion} = req.body

    const [rows] = await pool.query(
      'UPDATE Confirmacion SET descuento_producto = ? WHERE id_confirmacion = ?',
      [descuento_producto, id_confirmacion]
    )

    res.status(201).json({ message: 'Update realizado', result: rows })
  } catch (error) {
    console.log('Error al insertar el descuento de productos', error)
    res.status(500).json({ message: 'Error al insertar el descuento de productos' })
  }
}

//cambiar a 1 en estado
export const updateEstado = async (req: Request, res: Response) => {
  try {
    const { estado, id_confirmacion } = req.body

    const [cantidadRows]: any = await pool.query(
      'SELECT COUNT(*) as cantidad FROM Confirmacion WHERE estado = 1'
    )
    const [cupoRows]: any = await pool.query(
      'SELECT cupo_maximo FROM Evento_Cupo WHERE id_evento = 1'
    )

    const cantidad = Number(cantidadRows[0].cantidad)
    const cupo = Number(cupoRows[0].cupo_maximo)

    console.log("cantidad: " + cantidad + " cupo: " + cupo)

    if(cantidad >= cupo) {
      return res.status(409).json({ message: 'Lo sentimos, el evento ya no tiene cupo disponible' })
    }

    const [rows] = await pool.query(
      'UPDATE Confirmacion SET estado = ? WHERE id_confirmacion = ?',
      [estado, id_confirmacion]
    )

    const [confirmacion]: any = await pool.query(
      'SELECT * FROM Confirmacion WHERE id_confirmacion = ?',
      [id_confirmacion]
    )

    const [servicios]: any = await pool.query(
      `SELECT s.nombre, s.precio FROM Servicios s 
      INNER JOIN Servicios_seleccionados ss ON s.id_servicio = ss.id_servicio 
      WHERE ss.id_confirmacion = ?`,
      [id_confirmacion]
    )

    const [productos]: any = await pool.query(
      `SELECT p.nombre, p.precio FROM Productos p 
      INNER JOIN Productos_seleccionados ps ON p.id_producto = ps.id_producto 
      WHERE ps.id_confirmacion = ?`,
      [id_confirmacion]
    )

    const datos = confirmacion[0]
    const nombresServicios = servicios.map((s: any) => s.nombre).join(', ')
    const nombresProductos = productos.map((p: any) => p.nombre).join(', ')

    guardarLog(`
      =============================
      NUEVA CONFIRMACIÓN #${id_confirmacion}
      Cliente:            ${datos.nombres} ${datos.apellidos}
      Email:              ${datos.email}
      Servicios:          ${nombresServicios || 'Ninguno'}
      Productos:          ${nombresProductos || 'Ninguno'}
      Descuento servicios: ${datos.descuento_servicio}%
      Descuento productos: ${datos.descuento_producto}%
      =============================
    `)

    res.status(201).json({ message: 'Confirmación exitosa', result: rows })

  } catch (error) {
    console.log('Error al insertar el estado de productos', error)
    res.status(500).json({ message: 'Error al insertar el estado de productos' })
  }
}
