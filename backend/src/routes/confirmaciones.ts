import { Router } from 'express'
import { getCantConfirmaciones } from '../controllers/confirmacionesController'
import { agregarConfirmacion } from '../controllers/confirmacionesController'
import { idTemporal } from '../controllers/confirmacionesController'
import { updateDescuentoS } from '../controllers/confirmacionesController'
import { updateDescuentoP } from '../controllers/confirmacionesController'
import { getConfirmaciones } from '../controllers/confirmacionesController'
import { updateEstado } from '../controllers/confirmacionesController'
import { updateDatos } from '../controllers/confirmacionesController'
import { getcupo } from '../controllers/confirmacionesController'

const router = Router()

router.get('/', getCantConfirmaciones)
router.post('/agregarConfirmacion', agregarConfirmacion)
router.post('/getId', idTemporal)
router.post('/updateS', updateDescuentoS)
router.post('/updateP', updateDescuentoP)
router.post('/updateE', updateEstado)
router.post('/updateDatos', updateDatos)
router.get('/getCupo', getcupo)
router.get('/:id', getConfirmaciones)

export default router