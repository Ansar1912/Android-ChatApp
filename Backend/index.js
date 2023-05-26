const express = require('express');
const app = express();
const connectDB=require('./db.js')
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT
app.use(express.json())
app.use(cors())
connectDB()


// Routes
app.use("/api/auth",require("./routes/auth.js"))
app.use("/api/search",require("./routes/search.js"))
app.use("/api/chat",require("./routes/chat.js"))
app.post('/test',(req,res)=>{
    res.send({message:"okay"})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

