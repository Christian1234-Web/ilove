const mongoose = require("mongoose");
const kYCVerificationSchema = new mongoose.Schema({
	image: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	dateCreated:{type:Date,default:Date.now()}
});

const kYCVerification = mongoose.model("kYCVerification", kYCVerificationSchema);
module.exports = kYCVerification;    