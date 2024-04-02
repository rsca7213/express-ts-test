import express, { Application } from 'express'
import dotenv from 'dotenv'
import { appConfig, setupAppConfig } from './config/app.config'
import { router } from './routes/routes'
import { setupSwagger } from './config/swagger.config'

// Load environment variables
dotenv.config()
setupAppConfig()

// Create an Express application
export const app: Application = express()
app.use(express.json())

// Routing
app.use('/api', router)

// Swagger UI
setupSwagger(app)

// Start Express.js Server
export const server = app.listen(appConfig.port, () => {
  console.log(`[Server] Server is running at TCP Port ${appConfig.port}`)
})
