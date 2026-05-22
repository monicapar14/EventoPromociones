import { Router } from 'express'
import { getCupos } from '../controllers/infoEventoController'

const router = Router()

router.get('/', getCupos)

export default router