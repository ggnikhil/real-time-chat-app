import "dotenv/config"
import app from "./src/app.js"
import { connectedToDB } from "./src/config/database.js"
import {createServer} from 'http'
import { Server } from "socket.io"


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

connectedToDB()

io.on("connection", (socket) => {
    console.log("user connected successfully",socket.id)
});

httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})