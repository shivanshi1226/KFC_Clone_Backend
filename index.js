const express = require("express")
const env = require("dotenv").config();
const cors = require("cors")
const connection = require("./config/db");
const auth = require("./Auth/auth.middleware");
const userRouter = require("./Routes/user.routes")
const cartRouter = require("./Routes/cart.routes")
const menuRouter = require("./Routes/menu.routes")
const server = express();
const PORT = process.env.PORT || 3005

server.use(cors({
    origin: "*",
}))

server.use(express.json())
server.use('/user',userRouter)
server.use('/menu',menuRouter)
server.use('/cart',auth,cartRouter)

server.get("/",(req,res)=>{
    res.send("Server is running fine")
})

server.listen(PORT, async()=>{
    try{
        await connection
        console.log(`Server is running on port ${PORT} and connected to db`)
    }
    catch(error){
        console.log(`Error connecting to db,${error}`)
    }
})
