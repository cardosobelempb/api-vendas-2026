import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { env } from '../env'
import { errorHandler } from './middlewares/errorHandler'
import { router } from './routes'

/**
 * =============================
 * Swagger (OpenAPI) Config
 * =============================
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API',
    },
  },
  apis: ['src/routes/**/*.ts'],
}

/**
 * =============================
 * CORS Config (por ambiente)
 * =============================
 */
function getCorsOptions(): CorsOptions {
  if (env.NODE_ENV === 'production') {
    return {
      // origin: env.CORS_ORIGIN?.split(',') ?? [],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }
  }

  // Desenvolvimento
  return {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }
}

/**
 * =============================
 * Cria e configura o Express
 * =============================
 */
function createApp(): Application {
  const app = express()

  /**
   * Segurança HTTP
   */
  app.use(helmet())

  /**
   * CORS
   */
  app.use(cors(getCorsOptions()))

  /**
   * Body parsers
   */
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  /**
   * Healthcheck
   * Importante para Docker, K8s, Load Balancers
   */
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  /**
   * Swagger (somente fora de produção)
   */
  if (env.NODE_ENV !== 'production') {
    const swaggerSpec = swaggerJSDoc(swaggerOptions)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  /**
   * Rotas
   */
  app.use(router)

  /**
   * Middleware global de erro
   * ⚠️ Deve ser o último
   */
  app.use(errorHandler)

  return app
}

export { createApp }
