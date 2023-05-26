const mongoose = require('mongoose');
const { Schema }= mongoose;

const UserSchema= new Schema ({
    username:{
        type: String,
        required: true,
    },
    contactNo:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    registeredOn:{
        type:Date,
        default: Date.now
    },
    contacts:{
        type:[Object],
    }
})

const User= mongoose.model('user',UserSchema)
User.createIndexes();
module.exports=User