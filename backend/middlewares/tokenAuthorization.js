const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        // Extract the token from the request headers
        const authHeader = req.headers.authorization;
        //console.log('AuthHeader :', authHeader)
        if (!authHeader) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

        // Get token value (remove "Bearer " prefix)
        const token = authHeader.split(" ")[1];
        //console.log('token', token);
        // Verify the token
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or Expired Token" });
            }

            // Attach the decoded user data to req.user
            //console.log('Midd :', decoded) // Midd : { payload: '67bbe2b0a23341f219e678d5', iat: 1740366512, exp: 1740971312 }
            req.user = decoded.payload;
            next(); // Proceed to the next middleware or route handler
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error in Token Verification", error: error.message });
    }
}


module.exports = {verifyToken}