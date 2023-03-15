const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const schema = require('../Schema/UserSchema.js');
const jwt = require('jsonwebtoken')
const path = require('path')


router.post('/signUp', [body('name', 'Name Feild Should be of Minimum 3 characters long').isLength({ min: 3 })
    , body('email', 'Enter the valid Email').isEmail(),
body('password', 'Password Should be of at least 5 characters').isLength({ min: 5 })
]
    ,
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(404).json({ result });
        }

        try {
            const { name, email } = req.body;
            const details = await schema.findOne({ email: req.body.email }); // this is to find the same email id of the user whether exists or not then act according to that.
            if (details) {
                return res.status(400).json({ message: "Sorry this user with this email id Already exists" })
            } else {
                const genSalt = await bycrypt.genSalt(10);
                const securePassword = await bycrypt.hash(req.body.password, genSalt);
                const createdUser = await schema.create({
                    name: name,
                    email: email,
                    password: securePassword
                })
                const data = {
                    user: {
                        _id: createdUser.id
                    }
                }
                const JWT_SECRET = 'mananisagoodboy';
                const authToken = jwt.sign(data, JWT_SECRET);
                res.json({ authToken });
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Some Error Occurred will be resolved Soon" });
        }
    })



module.exports = router;