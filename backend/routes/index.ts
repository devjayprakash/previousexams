import { Router } from 'express'
import adminRouter from './admin'
import universityRouter from './university'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/university', universityRouter)

export default mainRouter
