import express, { Request, Response, NextFunction} from "express";

const app = express()
const PORT = 5000
app.get("/api/", (req:Request, res:Response, next: NextFunction): void=>{
    try{
        res.send("hello world")
    }catch(error){
        next(error)
    }
})

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})