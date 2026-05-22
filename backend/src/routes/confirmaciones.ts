import { Router } from 'express'
import { getCantConfirmaciones } from '../controllers/confirmacionesController'
import { agregarConfirmacion } from '../controllers/confirmacionesController'

const router = Router()

router.get('/', getCantConfirmaciones)
router.post('/agregarConfirmacion', agregarConfirmacion)

export default router