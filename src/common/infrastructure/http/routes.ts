import { Router } from 'express'
import loginController from './controllers/login.controller'

const router = Router()

router.get('/', loginController)

export { router }
