const JWT_SECRET = 'mananis$$agoodboy';
const jwt = require('jsonwebtoken')
const verifyUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({ error: 'Not Found' });
    }

    try {

        const verifyUser = jwt.verify(token, JWT_SECRET);
        req.user = verifyUser.user;
        next();

    } catch (error) {
        console.log(error.message);
        res.status('401').json({ error: 'Unauthorized Access' })
    }

}

module.exports = verifyUser;