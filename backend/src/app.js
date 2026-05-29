import express from 'express'
import authRouter from './routes/auth.routes.js'
import cookieparser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.middleware.js'
const app = express()

app.use(cookieparser())
app.use(express.json())
app.use('/api/auth', authRouter)


app.use(errorHandler)

export default app