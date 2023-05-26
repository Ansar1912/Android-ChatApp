const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();


router.get("/contact", fetchUser, async (req, res) => {
    const contactNo = req.query.contact;
    const pattern = `^${contactNo}`;
    const UserID = req.user.id

    // console.log(contactNo)
    try {
        searchList = await User.find({ contactNo: { $regex: pattern } })
        myUser = await User.findById(UserID)
        res.send({
            searchList,
            contacts: myUser.contacts,
            _id: myUser._id
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/addcontact", fetchUser, async (req, res) => {
    const { contacts } = req.body
    const UserID = req.user.id
    console.log(contacts)
    try {
        let UpdateUser;
        for (let index = 0; index < contacts.length; index++) {
            UpdateUser = await User.findByIdAndUpdate(UserID, { $addToSet: { contacts: contacts[index] } }, { new: true })
        }
        // for (let index = 0; index < contacts.length; index++) {
        //     console.log(contact[index]._id)
        // }
        res.status(200).json(
            {
                message: "Successfully Added",
                contacts: UpdateUser.contacts
            })
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})


module.exports = router