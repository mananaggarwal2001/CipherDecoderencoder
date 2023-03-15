const express = require('express')
const router = express.Router();
const path= require('path')
router.get('/', (req, res) => {
    res.send("<h1>This is the Starting of the page.</h1>")
})

module.exports = router;