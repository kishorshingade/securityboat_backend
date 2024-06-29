const mongoose = require('mongoose')

const connectionString = "mongodb://127.0.0.1:27017/Ecommarce"

mongoose.connect(connectionString)

.then(()=>{
    console.log("Connection Established Successfully !!")
})
.catch(()=>{
    console.log("Error to Connect !!")
})