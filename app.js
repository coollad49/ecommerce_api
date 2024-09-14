import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import { configDotenv } from "dotenv";
import { authRouter } from "./routes/AuthRoute.js";

const app = express()
const port = process.env.PORT || 3000

app.get('/', async(req, res, next)=>{
    res.send("Jesus!!!")
})

app.use('/auth', authRouter)

app.use(async (req, res, next)=>{
    next(createHttpError.NotFound())
})

app.use((err, req, res, next)=>{
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