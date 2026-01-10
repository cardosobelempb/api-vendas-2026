import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerJSDoc from 'swagger-jsdoc'
import { erroHandler } from './middlewares/errorHandler'
import { router } from './routes'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documntation',
      version: '1.0.0',
    },
  },
  apis: [],
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()

app.use(cors())

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(router)
app.use(erroHandler)

export { app }
