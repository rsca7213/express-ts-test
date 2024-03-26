import express, { Application } from 'express'
import dotenv from 'dotenv'
import { appConfig, setupAppConfig } from './config/app.config'

// Load environment variables
dotenv.config()
setupAppConfig()

// Create an Express application
const app: Application = express()
app.use(express.json())

// Routing

// Start Express.js Server
app.listen(appConfig.port, () => {
  console.log(`[Server] Server is running at TCP Port ${appConfig.port}`)
})
