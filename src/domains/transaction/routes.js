const express = require("express");
const router = express.Router();
const {
  getSingleTransaction,
  getAllTransaction,
  approvePendingTransaction,
  disApprovePendingTransaction,
  getPendingTransactionByUserId,
  getAllPendingTransaction,
} = require("./controller");

router.get("/single/:transactionId", async (req, res) => {
  try {
    const response = await getSingleTransaction(req.params.transactionId);
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

router.get("/pending/:userOne/:userTwo", async (req, res) => {
  try {
    const response = await getPendingTransactionByUserId(
      req.params.userOne,
      req.params.userTwo
    );
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const response = await getAllTransaction();
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});
router.get("/pending/all", async (req, res) => {
  try {
    const response = await getAllPendingTransaction();
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});
router.post("/pending/approve", async (req, res) => {
  try {
    const response = await approvePendingTransaction(req.body);
    res.json({
      status: "SUCCESS",
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});
router.post("/pending/disapprove", async (req, res) => {
  try {
    const response = await disApprovePendingTransaction(req.body);
    res.json({
      status: "SUCCESS",
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

module.exports = router;
