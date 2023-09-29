const mongoose = require("mongoose");

const ProfileImageSchema = new mongoose.Schema({
    image: { type: String, required:true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
{ timestamps: true }
);

const CoverImageSchema = new mongoose.Schema({
    image: { type: String, required:true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
{ timestamps: true }
);
const PostImageSchema = new mongoose.Schema({
  image: { type: String, required:true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
},
{ timestamps: true }
);

const CoverImage = mongoose.model("CoverImage", CoverImageSchema);
const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);
const PostImage = mongoose.model("PostImage", PostImageSchema);

module.exports = {ProfileImage,CoverImage,PostImage};