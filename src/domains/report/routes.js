const express = require("express");
const router = express.Router();
const {
  getReportByReportId,
  getAllReport,
  createReport,
  getReportByUserId,
} = require("./controller");

router.post("/new", async (req, res) => {
  try {
    const response = await createReport(req.body);
    res.json({
      status: "SUCCESS",
      message: "Report  created successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.get("/reporter/:id", async (req, res) => {
  try {
    const response = await getReportByUserId(req.params.id);
    res.json({
      status: "SUCCESS",
      data: response,
      message:"get report by reporter id successful"

    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/reportId/:id", async (req, res) => {
  try {
    const response = await getReportByReportId(req.params.id);
    res.json({
      status: "SUCCESS",
      data: response,
      message:"get report by report id successful"
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
    const response = await getAllReport();
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
