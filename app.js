import express from "express";
import connectDB from "./config/db.js";
import urlsRouter from "./routes/urls.js";
import indexRouter from "./routes/index.js";

connectDB()
const app = express()
const PORT = 3000

app.use(express.json())

app.use('/api', urlsRouter)
app.use('/', indexRouter)





app.get('/health', (req, res) => {
    res.send({ status: "running" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
