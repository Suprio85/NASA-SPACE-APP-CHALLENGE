import {Router} from 'express'
import { predictExoplanetType } from '../controllers/prediction.controller.js'



const router = Router()

router.route('/predicttype').post(predictExoplanetType)

export default router