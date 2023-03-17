const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const schema = require('../Schema/UserSchema.js');
const jwt = require('jsonwebtoken')
const path = require('path')
const { token } = require('../middleware/verifyUser')
const JWT_SECRET = 'mananis$$agoodboy';
const http = require('http')
const queryString = require('querystring')
const request = require('request');


router.post('/signUp', [body('name', 'Name Field Should be of Minimum 3 characters long').isLength({ min: 3 })
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
            const { name, email, fatherName, motherName, dateofbirth, phoneNumber } = req.body;
            const details = await schema.findOne({ email: req.body.email }); // this is to find the same email id of the user whether exists or not then act according to that.
            if (details) {
                return res.status(400).json({ message: "Sorry this user with this email id Already exists" })
            } else {
                const genSalt = await bycrypt.genSalt(10);
                const securePassword = await bycrypt.hash(req.body.password, genSalt);
                const createdUser = await schema.create({
                    name: name,
                    email: email,
                    password: securePassword,
                    fatherName: fatherName,
                    motherName: motherName,
                    dateofbirth: dateofbirth,
                    phoneNumber: phoneNumber
                })
                res.send({ createdUser });
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Some Error Occurred will be resolved Soon" });
        }
    })

router.post('/login', [
    body('email', 'PLease Enter the valid Email').isEmail(),
    body('password', 'Password Cannot be blank').exists()
],
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result });
        }

        try {

            const { email, password } = req.body;
            const resultantDetails = await schema.findOne({ email: email });
            if (!resultantDetails) {
                return res.status(400).json({ message: 'Please Authenticate using valid Credentials email' })
            }

            const resultantPassword = await bycrypt.compare(password, resultantDetails.password);
            if (!resultantPassword) {
                return res.status(400).json({ message: 'Please Authenticate using valid Credentials password' })
            }

            const data = {
                user: {
                    id: resultantDetails.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            token = authToken;

            res.redirect('http://localhost:3000/api/details/dashboard');

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Some error Occured in the internal Server' });
        }
    })

module.exports = router;