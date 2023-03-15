const Connect = require('./DataBaseConnectivity/Connectivity')
Connect();
const express = require('express')
const router= require('./Routes/auth')
const bodyParsner= require('body-parser')
const app = express();


app.use(bodyParsner.urlencoded({ extended: true })) // used for the fetching the data of the form from the frontend to the backend.
app.use(bodyParsner.json())



app.use(router);
app.listen('3000', () => {
    console.log('Connection is made Successfully to the port 3000');
})