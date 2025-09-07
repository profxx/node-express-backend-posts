import express from "express"
import router from "./routes.js"
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", router)


app.get("/apicheck", (req, res) => {
    res.status(200).json({message:"API Online"})
})

app.listen(3000, () => {
    console.log("Servidor funcionando.")
})