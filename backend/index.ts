import dotenv from 'dotenv'

dotenv.config({})

import express, { ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { PORT } from './constants'
import mainRouter from './routes'
const app = express()

// middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes config
app.use('/api', mainRouter)

//404 routes
app.all('*', (_, res) => {
    res.send({
        msg: "Please check your path. It's not found.",
        code: 404,
    })
})

const errorHandler: ErrorRequestHandler = (err, _req, res, _) => {
    console.error(err)
    res.send({
        code: 500,
        msg: 'Internal server error',
    })
}

// 500 route
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
