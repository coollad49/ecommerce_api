import express, {Request, Response, NextFunction} from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import { authRouter } from "@/routes/AuthRoute"
import { productRouter } from "@/routes/productRoute";
import { verifyAccessToken } from "@/lib/jwt";
import client from "@/lib/redis";
import { cartRouter } from "./routes/cartRoute";

// const initializeRedis = async()=>{
//     try{
//         await client.connect();
//     } catch(error){
//         console.error('Error connecting to Redis:', error);
//     }
// }
// initializeRedis()

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.get('/', verifyAccessToken, async(req, res, next)=>{
    res.send("Jesus is glorified!!!")
})

app.use('/auth', authRouter)

app.use('/products', productRouter)

app.use("/cart", cartRouter)

app.use(async (req, res, next)=>{
    next(createHttpError.NotFound())
})

app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})