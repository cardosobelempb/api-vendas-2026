import cors from 'cors'
import express from 'express'

import { erroHandler } from './middlewares/errorHandler'
import { router } from './routes'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)
app.use(erroHandler)

export { app }
