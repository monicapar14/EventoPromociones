import { Router } from 'express'
import { getProductos } from '../controllers/productosController'
import { getDescuentosProductos } from '../controllers/productosController'

const router = Router()

router.get('/', getProductos)

router.get('/descuentos', getDescuentosProductos)

export default router