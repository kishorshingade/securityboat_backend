require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.port
const host = process.env.host
const userRoute = require('./Routes/userRoute')
const cors = require('cors')

require('./dbConnection/dbConn')

app.use(cors())
app.use(express.json())
app.use(userRoute)

app.listen(port,()=>{
    console.log(`server started on http://${host}:${port}`)
})