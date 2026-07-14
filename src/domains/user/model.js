const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,trim:true },
  password: { type: String, required: true },
  profilePic: { type: String, default: null },
  coverPic: { type: String, default: null },
  // gender: { type: String, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: String, default: null },
  bio: { type: String, default: null },
  active: { type: Boolean, default: false },
  profession: { type: String, default: null },
  address: { type: String, default: null },
  // blockedUsers: { type: Array },
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest",
    },
  ],
verificationStatus: {
    phone: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    face: { type: Boolean, default: false },
    kyc: { type: Boolean, default: false }
  },
  emailVerification: { type: Boolean, default: false },
  isBan: { type: Boolean, default: false },
  phone: { type: String, required: true, unique: true, maxlength: 12 },
  email: { type: String, required: true, unique: true,lowercase:true,trim:true },
  userType: { type: String, default: "regular" },
  dateOfBirth: { type: Date, default: null },
  dateCreated: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
