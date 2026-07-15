const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: null },
  coverPic: { type: String, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: String, default: null },
  bio: { type: String, default: null },
  active: { type: Boolean, default: false },
  profession: { type: String, default: null },
  address: { type: String, default: null },
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
    face: { type: Boolean, default: false }, // 👈 Admin-controlled verification
    kyc: { type: Boolean, default: false }
  },
  emailVerification: { type: Boolean, default: false },
  isBan: { type: Boolean, default: false },
  phone: { type: String, required: true, unique: true, maxlength: 12 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  userType: { type: String, default: "regular" },
  dateOfBirth: { type: Date, default: null },
  dateCreated: { type: Date, default: Date.now } // Avoid running Date.now() immediately in schema definition
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, // Ensure virtuals are sent in API responses
  toObject: { virtuals: true }
});

// Virtual field to calculate overall verification dynamically
// It requires both administrative checks (face or kyc) to be true
UserSchema.virtual('isVerified').get(function() {
  return (
    this.verificationStatus.face === true ||
    this.verificationStatus.kyc === true
  );
});

const User = mongoose.model("User", UserSchema);
module.exports = User;