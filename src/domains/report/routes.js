const express = require("express");
const router = express.Router();
const {
  getMyReports,
  createUserReport,
  getSingleReport,
} = require("./controller");

router.post('/new', createUserReport);


router.get("/reporter/:reporterId", async (req, res) => {
  try {
    const response = await getMyReports(req.params.reporterId);
    res.json({
      status: "SUCCESS",
      data: response,
      count: response.length
    });

  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/single/:reportId/:userId", async (req, res) => {
  try {
    const response = await getSingleReport(req.params.reportId, req.params.userId);
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
