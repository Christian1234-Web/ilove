const mongoose = require("mongoose");
const UsersInterestSchema = new mongoose.Schema({
	title: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	dateCreated:{type:Date,default:Date.now()}
});

const UsersInterest = mongoose.model("UsersInterest", UsersInterestSchema);
module.exports = UsersInterest;    