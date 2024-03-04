const express = require("express");
const router = express.Router();
const {
  getAllWalletTransaction,
  getUserWalletTransaction,
} = require("./controller");

router.get("/user/:id", async (req, res) => {
  try {
    const response = await getUserWalletTransaction(req.params.id);
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

router.get("/all", async (req, res) => {
  try {
    const response = await getAllWalletTransaction();
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

module.exports = router;
