const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    //console.log(userId);
    // jwt.sign( object, secret key) => 2 params
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    return token;
}

module.exports = { generateToken }
