import { Router } from 'express'
import { getServicios } from '../controllers/serviciosController'
import { getDescuentosServicios } from '../controllers/serviciosController'

const router = Router()

router.get('/', getServicios)

router.get('/descuentos', getDescuentosServicios)

export default router