const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profilePic: { type: String },
	coverPic: { type: String },
	bio: { type: String },
	active:{type:Boolean, default:false},
	profession: { type: String },
	address: { type: String },
	blockedUsers: { type: Array },
	interest: { type: Array },
	phoneVerification: { type: Boolean, default:false },
	emailVerification: { type: Boolean, default:false },
	faceVerification: { type: Boolean, default:false },
	kycVerification: { type: Boolean, default:false },
	phone: { type: String, required: true, unique: true, maxlength: 12 },
	email: { type: String, required: true, unique: true },
	userType: { type: String ,default:"user"},
    dateCreated:{type:Date,default:Date.now()}
});

const User = mongoose.model("User", UserSchema); 
module.exports = User;     