const mongoose = require('mongoose');
const { Schema }= mongoose;

const ChatSchema= new Schema ({
    sender_id:{
        type: String,
        required: true,
    },
    reciever_id:{
        type:String,
        required: true,
        
    },
    message:{
        type:String,
        required: true
    },
    registeredOn:{
        type:Date,
        default: Date.now
    },
})

const Chat= mongoose.model('chat',ChatSchema)
Chat.createIndexes();
module.exports=Chat