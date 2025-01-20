const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reporterId: {  
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    complain: { 
      type: String, 
      required: true, 
      trim: true, 
      minlength: 10, 
      maxlength: 500 
    },
    complainType: {
      type: String,
      enum: ["Spam", "Harassment", "Fraud", "Other"],
      required: true,
    },
    status: { 
      type: String, 
      enum: ["Pending", "Reviewed", "Resolved"], 
      default: "Pending" 
    }
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
