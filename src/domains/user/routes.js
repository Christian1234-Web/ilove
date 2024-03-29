const express = require("express");
const {
  createNewUser,
  getAllUser,
  deleteUser,
  loginUser,
  findUser,
  forgetPassword,
  updatePassword,
  updateUser,
  getSingleUser,
  blockUser,
  unBlockUser,
} = require("./controller");
const router = express.Router();
const {
  sendOTPVerificationEmail,
} = require("../email_verification_otp/controller");
const { createWallet } = require("../../domains/wallet/controller");
const generateOTP = require("../../util/generateOTP");
//signup

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password, phone, address } = req.body;
    username = username.trim();
    email = email.trim();
    email = email.toLowerCase();
    password = password.trim();

    if (username == "" || email == "") {
      throw Error("Empty input fields!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    } else if (password.length < 4) {
      throw Error("Password is too short!");
    } else {
      // valid credentials

      const otp = await generateOTP();
      const subject = "Verify Your Email";
      const text = `<p>
        Enter <b>${otp}</b> in the app to verify your email address
          <p>This code <b>expires in 10 minutes</b>.</p>`;
      const newUser = await createNewUser({
        username,
        email,
        password,
        phone,
        address,
      });
      const wallet = await createWallet(newUser._id);
      const emailData = await sendOTPVerificationEmail({
        userId: newUser._id,
        email: newUser.email,
        subject,
        text,
      });

      res.json({
        status: "PENDING",
        message: "Verification code sent to email",
        data: emailData,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// signin
router.post("/signin", async (req, res) => {
  try {
    const response = await loginUser(req.body, res);
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// all user
router.get("/all", async (req, res) => {
  try {
    const allusers = await getAllUser();
    res.json({
      status: "SUCCESS",
      data: allusers,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// single user
router.get("/single/:id", async (req, res) => {
  try {
    const response = await getSingleUser(req.params.id);
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// find user by username
router.get("/find/:username", async (req, res) => {
  try {
    const response = await findUser({ username: req.params.username });
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// forget password
router.post("/forget-password", async (req, res) => {
  try {
    const response = await forgetPassword(req.body);
    res.json({
      status: "SUCCESS",
      message: "Mail has been sent, check your email for otp",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.post("/update-password", async (req, res) => {
  try {
    let { password } = req.body;
    password = password.trim();

    if (password.length < 4) {
      throw Error("Password is too short!");
    }
    const response = await updatePassword(req.body);
    res.json({
      status: "SUCCESS",
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// block a user
router.post("/block", async (req, res) => {
  try {
    const response = await blockUser(req.body);
    res.json({
      status: "SUCCESS",
      message:
        "User blocked successfully, you wont be able send message to this user",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// un block a user
router.post("/unblock", async (req, res) => {
  try {
    const response = await unBlockUser(req.body);
    res.json({
      status: "SUCCESS",
      message:
        "User unblocked successfully, you can now be able send message to this user",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// update user
router.put("/update/:id", async (req, res) => {
  try {
    const response = await updateUser(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "User Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await deleteUser(req.params.id);

    res.json({
      status: "SUCCESS",
      message: "User deleted",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
