const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Chat = require("../models/Chat");

router.post("/getchat", fetchUser, async (req, res) => {
    const { reciever_id } = req.body
    const userID = req.user.id
    const chat = await Chat.find({
        sender_id: userID,
        reciever_id
    })
    const chatInvert = await Chat.find({
        sender_id: reciever_id,
        reciever_id: userID
    })
    const mergedList = chat.concat(chatInvert)
    mergedList.sort((obj1, obj2) => {
        const date1 = new Date(obj1.registeredOn);
        const date2 = new Date(obj2.registeredOn);
        return date2 - date1;
    });
    res.status(200).json({
        mergedList
    })

})

router.post("/addchat", fetchUser, async (req, res) => {
    const { reciever_id, message } = req.body
    const userID = req.user.id
    const chat = await Chat.create({
        sender_id: userID,
        reciever_id,
        message
    })
    res.status(200).json({
        message: "Message Add Successfully"
    })
})

router.post("/deletechat",fetchUser,async(req,res)=>{
    const {chats}=req.body
    console.log(chats)
        for (let index = 0; index < chats.length; index++) {
            await Chat.findByIdAndDelete(chats[index].chatid)
        }
        // console.log(chat)
        res.status(200).json()
})

module.exports = router