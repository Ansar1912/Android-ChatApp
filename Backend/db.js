const mongoose=require('mongoose')
require('dotenv').config();
const mongoURL =process.env.DB_URL


const connectToMongoDB=()=>{
    mongoose.connect(mongoURL,
        console.log(`Connected To ${mongoURL}`)
    )
}

module.exports=connectToMongoDB