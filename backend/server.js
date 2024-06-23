import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


//app configuration
const app = express()
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json())
app.use(cors())

// Database Connection
connectDB();

//api end points
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);

app.get("/",(req,resp)=>{
    resp.send("api will perfectly working")
})
app.listen(port,()=>{
    console.log(`Server is Started on http://localhost:${port}`)
})

