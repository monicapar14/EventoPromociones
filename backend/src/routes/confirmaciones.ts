import { Router } from 'express'
import { getCantConfirmaciones } from '../controllers/confirmacionesController'
import { agregarConfirmacion } from '../controllers/confirmacionesController'
import { getIdMax } from '../controllers/confirmacionesController'

const router = Router()

router.get('/', getCantConfirmaciones)
router.post('/agregarConfirmacion', agregarConfirmacion)
router.get('/getMax', getIdMax)

export default router