const mongoose = require("mongoose");

const ProfileImageSchema = new mongoose.Schema({
    image: { type: String, required:true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
{ timestamps: true }
);

const CoverImageSchema = new mongoose.Schema({
    image: { type: String, required:true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
{ timestamps: true }
);


const CoverImage = mongoose.model("CoverImage", CoverImageSchema);
const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);

module.exports = {ProfileImage,CoverImage};