import { Router } from 'express'
import { getProductos } from '../controllers/productosController'
import { getDescuentosProductos } from '../controllers/productosController'
import { agregarProducto } from '../controllers/productosController'
import { getProductosById } from '../controllers/productosController'
import { updateProductos } from '../controllers/productosController'

const router = Router()

router.get('/', getProductos)

router.get('/descuentos', getDescuentosProductos)

router.post('/agregarProducto', agregarProducto)

router.get('/:id', getProductosById)

router.post('/updateProductos', updateProductos)

export default router