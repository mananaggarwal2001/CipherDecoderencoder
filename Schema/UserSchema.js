const mongoose = require('mongoose')
const MaxNumber = Math.pow(10, 12);
const MinNumber = Math.pow(10, 11);
const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require:true
    },
    // fatherName: {
    //     type: String,
    //     require:true
    // },
    // motherName: {
    //     type: String,
    //     require:true
    // },
    // dateofBirth: {
    //     type: String,
    //     require:true
    // },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    AadharNo: {
        type: Number,
        default: Math.floor(Math.random() * (MaxNumber - MinNumber + 1) + MinNumber)
    }


})
const user = mongoose.model('AadharDetails', UserSchema);
user.createIndexes()
module.exports = user;