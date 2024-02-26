const express = require("express");
const {
  createChat,
  deleteChat,
  findUserChats,
  findChat,
  findRecentChatInteraction,
} = require("./controller");
const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    const response = await createChat(firstId, secondId);

    res.json({
      status: "SUCCESS",
      chat: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const response = await findUserChats(req.params.userId);

    res.json({
      status: "SUCCESS",
      chat: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/recent/:userId", async (req, res) => {
  try {
    const response = await findRecentChatInteraction(req.params.userId);

    res.json({
      status: "SUCCESS",
      recentInteraction: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.get("/find/:firstId/:secondId", async (req, res) => {
  try {
    const response = await findChat(req.params.firstId, req.params.secondId);

    res.json({
      status: "SUCCESS",
      chat: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await deleteChat(req.params.id);

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

module.exports = router;
