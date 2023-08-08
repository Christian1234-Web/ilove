const express = require("express");

const router = express.Router();

const userRoutes = require("../domains/user");
const phoneRoutes = require("../domains/phone_verification_otp");

router.use("/user", userRoutes)
router.use("/phone", phoneRoutes)



module.exports = router;
 