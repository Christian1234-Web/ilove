const Report = require("./model");

const createReport = async (data) => {
  const {reporterId,reportedUserId,complain,complainType} = data
  try {
    // create report
    const report = new Report({
      reporterId,reportedUserId,complain,complainType
    });

    // save  report
    await report.save();
    return {
      report,
    };
  } catch (err) {
    throw err;
  }
};

const getReportByReportId = async (reporterId) => {
  try {
    // get user report
    const report = await Report.findOne({_id: reporterId })
    .populate("reporterId")
    .populate("reportedUserId")
    return {report};
  
  } catch (err) {
    throw err;
  }
};
const getReportByUserId = async (userId) => {
  try {
    // get report by userId
    const report = await Report.find({reporterId: userId })
    .populate("reporterId")
    .populate("reportedUserId")
    return {report};
  
  } catch (err) {
    throw err;
  }
};

const getAllReport = async () => {
  try {
    // get all report
    const report = await Report.find()
    .populate("reporterId")
    .populate("reportedUserId")

    return {
      report,
    };
  } catch (err) {
    throw err;
  }
};


module.exports = {
  getAllReport,
  getReportByUserId,
  createReport,
  getReportByReportId
};
