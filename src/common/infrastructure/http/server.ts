import { env } from '../env'
import { createApp } from './app'

import type { Server } from 'http'

/**
 * Inicia o servidor HTTP.
 * Retorna a instância do servidor para controle do ciclo de vida.
 */
function startServer(): Server {
  const port = env.PORT
  const url = env.API_URL

  const app = createApp()

  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${url}`)
    console.log(`📄 API docs available at GET ${url}/docs`)
  })

  server.on('error', error => {
    console.error('[Server] Erro ao iniciar servidor:', error)
    process.exit(1)
  })

  return server
}

export { startServer }
