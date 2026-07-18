const express = require("express");
const { send, verify, getMe } = require("./auth.controller");

const router = express.Router();

router.post("/send", send);
router.post("/verify", verify);
router.post("/me", getMe);

module.exports = router;
