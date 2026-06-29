import express from 'express'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import cookieparser from 'cookie-parser'
import morgan from "morgan"
import cors from "cors"
import { errorHandler } from './middleware/errorHandler.middleware.js'
const app = express()

app.use(cookieparser())
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRouter)
app.use("/api/message",messageRouter)


app.use(errorHandler)

export default app