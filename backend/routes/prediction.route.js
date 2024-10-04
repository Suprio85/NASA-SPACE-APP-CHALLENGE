import {Router} from 'express'
import { predictExoplanetType, predictExoplanetName } from '../controllers/prediction.controller.js'




const router = Router()

router.route('/predicttype').post(predictExoplanetType)
router.route('/predictname').post(predictExoplanetName)

export default router