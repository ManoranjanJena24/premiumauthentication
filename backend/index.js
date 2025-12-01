import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import {createClient} from 'redis'
import cookieParser from "cookie-parser";

dotenv.config()

await connectDb()

const redisUrl = process.env.REDIS_URL

if(!redisUrl){
    console.log("Missing redis url");
    process.exit(1)
}

export const redisClient = createClient({
    url:redisUrl
})




// Change .catch(console.log(first)) to .catch((err) => console.log(err))
redisClient.connect()
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.error("Redis Connection Error:", err)); // Using console.error is better for errors

const app = express()


// middlewares

app.use(express.json())
app.use(cookieParser())


// importing routes 
import userRoutes from './routes/user.js'


// Using routes
app.use('/api/v1',userRoutes)

const PORT =process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT  ${PORT}`)
})