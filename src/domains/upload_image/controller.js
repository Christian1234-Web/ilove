const {CoverImage,ProfileImage} = require("./model");
const User = require("../user/model");
const uploadImage = require("../../upload/uploadImage");

// upload profile image
const uploadProfileImage = async (userId,image) => {
    try{
        const user = await User.findOne({_id:userId});
        const imagePath = await uploadImage(image);
        const profileImage = await new ProfileImage({
            userId,
            image:imagePath
        })
            user.profilePic = imagePath;
            await  user.save();
            await  profileImage.save();
            return{
                profileImage
            }
    }catch(err){
        throw err;
    }
};

// upload cover image
const uploadCoverImage = async (userId,image) => {
    try{
        const user = await User.findOne({_id:userId});
        const imagePath = await uploadImage(image);
        const coverImage =  new CoverImage({
            userId,
            image:imagePath
        })
            user.coverPic = imagePath;
            await  user.save();
            await  coverImage.save();
            return{
                coverImage
            }
    }catch(err){
        throw err;
    }
};
const getAllProfilePics = async () => {
    try{
        const profiePics = await ProfileImage.find();
        return {profiePics}
    }catch(err){
        throw err;
    }
};
const getAllCoverPics = async () => {
    try{
        const coverPics = await CoverImage.find();
        return {coverPics}
    }catch(err){
        throw err;
    }
}
const deleteAllProfilePics = async () => {
    try{
        const profiePicsRecords = await ProfileImage.deleteMany();
    }catch(err){
        throw err;
    }
}

module.exports = { uploadCoverImage, uploadProfileImage, getAllProfilePics,getAllCoverPics, deleteAllProfilePics}