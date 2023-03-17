const JWT_SECRET = 'mananis$$agoodboy';
const jwt = require('jsonwebtoken')
let token = "";

const verifyUser = (req, res, next) => {
    let  fetchedtoken = req.header('auth-token');
    if (!fetchedtoken) {
        return res.status(400).json({ error: 'Not Found' });
    }

    try {

        // const verifyUser = jwt.verify(token, JWT_SECRET);
        // req.user = verifyUser.user;
        // next();
        console.log(fetchedtoken)

    } catch (error) {
        console.log(error.message);
        res.status('401').json({ error: 'Unauthorized Access' })
    }

}

module.exports = {verifyUser,token};