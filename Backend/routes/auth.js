const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require("express-validator")
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET


router.post("/createuser", [
    // body('username',"Must have a length more than 5 characters").isLength({min:5}),
    // body('contactNo',"Enter Numeric Number Only").isNumeric(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, contactNo } = req.body
    // Salting Password
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt)

    // 

    try {
        user = await User.create({
            username,
            contactNo,
            password: securePass,
        })
        res.status(200).json({ message: "User Registered Succesfully" })


    } catch (error) {
        res.send({
            message: error
        })
    }


})

router.post("/login", async (req, res) => {
    try {
        const { contactNo, password } = req.body
        user = await User.findOne({ contactNo })
        if (!user) {
            res.status(401).json({
                message: "Please Enter Valid ContactNo or Password"
            })

        }
        else {
            const passwordCompare = await bcrypt.compare(password, user.password)

            if (!passwordCompare) {
                res.status(401).json({
                    message: "Please Enter Valid ContactNo or Password"
                })
            }
            else {

                const data_JWT = {
                    user: {
                        id: user.id
                    }
                }

                const authToken = jwt.sign(data_JWT, jwt_secret)
                res.status(200).json({
                    message: "Login Successfully",
                    authToken,
                    contacts:user.contacts
                })

            }
        }

    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (user == null) {
            res.status(401)
        }
        else {
            const { contacts,_id } = user
            res.status(200).json({
                message: "Login Successfully",
                contacts,
                _id
            })
        }
    } catch (error) {
        res.status(400)
    }
})

router.post("/getuserbyid",async (req,res)=>{
    
    try {
        const user = await User.findById(req.body._id)
        if(!user){
            res.status(401)
        }
        else{
            const {username,contactNo,_id}=user
            res.status(200).json({
                username,
                contactNo,
                _id
            })
        }
    } catch (error) {
        res.status(400)
    }
})

module.exports = router