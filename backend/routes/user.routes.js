const express = require("express");
const router = express.Router();
const {registerUser, getAllUsers} = require("../controllers/user.controllers")
const {verifyToken} = require("../middlewares/tokenAuthorization")


router.post("/register", registerUser);
router.get("/allUsers", verifyToken, getAllUsers);


module.exports = router;