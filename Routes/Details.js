const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const schema  = require('../Schema/UserSchema');
const router = require('./auth');
const routers = express.Router();
routers.put('/dashboard', verifyUser, async (req, res, next) => {
    const user = req.user.id;
    const userDetails = await schema.findById(user).select('-password');
    res.json({userDetails})
})

module.exports = routers;