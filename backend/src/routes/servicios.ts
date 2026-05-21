import { Router } from 'express'
import { getServicios } from '../controllers/serviciosController'

const router = Router()

router.get('/', getServicios)

export default router