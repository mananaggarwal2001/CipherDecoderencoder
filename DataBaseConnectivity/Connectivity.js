
const exportConnection = async () => {
    const mongoose = require('mongoose')
    const Port = "mongodb://127.0.0.1:27017/AadharDetails?directConnection=true";
    try {
        await mongoose.connect(Port);

        console.log("Connection is made Sucessfully")

    } catch (error) {
        console.log(error.message)
        console.log("Connection is not made Sucessfully")
    }
}

module.exports = exportConnection;