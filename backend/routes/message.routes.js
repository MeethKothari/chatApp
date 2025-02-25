const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/tokenAuthorization")
const {sendMessage, getMessage} = require("../controllers/message.controller.js");


router.get("/get/:id", verifyToken, getMessage);
router.post("/send/:id", verifyToken, sendMessage);

module.exports = router; 