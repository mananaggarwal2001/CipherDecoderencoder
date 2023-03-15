const Connect = require('./DataBaseConnectivity/Connectivity')
Connect();
const express = require('express')
const auth = require('./Routes/auth')
const bodyParsner = require('body-parser')
const app = express();
const path = require('path')
const MaxNumber = Math.pow(10, 12);
const MinNumber = Math.pow(10, 11);

app.use(bodyParsner.urlencoded({ extended: true })) // used for the fetching the data of the form from the frontend to the backend.
app.use(bodyParsner.json())
app.use(express.static('Public'))
app.get('/', (req, res, next) => {
    console.log();
    res.sendFile(path.join(__dirname + '/index.html'))
})


app.use('/api/auth', auth);

app.listen('3000', () => {
    console.log('Connection is made Successfully to the port 3000');
})