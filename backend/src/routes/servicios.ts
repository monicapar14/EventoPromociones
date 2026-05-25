import { Router } from 'express'
import { getServicios } from '../controllers/serviciosController'
import { getDescuentosServicios } from '../controllers/serviciosController'
import { agregarServicio } from '../controllers/serviciosController'
import { getServiciosById } from '../controllers/serviciosController'
import { updateServicios } from '../controllers/serviciosController'

const router = Router()

router.get('/', getServicios)

router.get('/descuentos', getDescuentosServicios)

router.post('/agregarServicio', agregarServicio)

router.get('/:id', getServiciosById)

router.post('/updateServicios', updateServicios)

export default router