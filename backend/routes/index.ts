import { Router } from 'express'
import adminRouter from './admin'
import universityRouter from './university'
import courseRouter from './courses'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/university', universityRouter)
mainRouter.use('/course', courseRouter)

export default mainRouter
