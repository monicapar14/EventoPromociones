import { Router } from 'express'
import { getCantConfirmaciones } from '../controllers/confirmacionesController'

const router = Router()

router.get('/', getCantConfirmaciones)

export default router