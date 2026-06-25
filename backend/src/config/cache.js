import Redis from "ioredis"

export const redis = new Redis({
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
    host:process.env.REDIS_HOST
})

redis.on("connect",()=>{
    console.log("redis connected successfully")
})