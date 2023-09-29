const {CoverImage,ProfileImage,PostImage} = require("./model");
const User = require("../user/model");
// const uploadImage = require("../../upload/uploadImage");

// upload profile image
const uploadProfileImage = async (userId,image) => {
    try{
        const user = await User.findOne({_id:userId});
        // const imagePath = await uploadImage(image);
        if(user.profilePic !== null){
            const profileImage =  new ProfileImage({
                userId,
                image
            })
                user.profilePic = image;
                await  user.save();
                await  profileImage.save();
                return{
                    profileImage
                }
        }else{
            throw Error("User cannot chnage their profile pic");
        }
       
    }catch(err){
        throw err;
    }
};

// upload cover image
const uploadCoverImage = async (userId,image) => {
    try{
        const user = await User.findOne({_id:userId});
        // const imagePath = await uploadImage(image);
        const coverImage =  new CoverImage({
            userId,
            image
        })
            user.coverPic = image;
            await  user.save();
            await  coverImage.save();
            return{
                userId,
                coverImage
            }
    }catch(err){
        throw err;
    }
};
const uploadPostImage = async (userId,image) => {
    try{
        const user = await User.findOne({_id:userId});
        // const imagePath = await uploadImage(image);
        if(user){
            const postImage =  new PostImage({
                userId,
                image
            })
                await  postImage.save();
                return{
                    userId,
                    postImage
                }
        }else{
            throw Error("User not found")
        }

    }catch(err){
        throw err;
    }
};
const getUserPost = async (userId) => {
    try{
        const posts = await PostImage.find({userId});
        return {posts}
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
        return;
    }catch(err){
        throw err;
    }
}
const deletePost = async (id) => {
    try{
        const post = await PostImage.deleteOne({_id:id});
        if(post.deletedCount == 0){
            throw Error("Post failed to delete");
        }
        return; 
    }catch(err){
        throw err;
    }
}

module.exports = { uploadCoverImage,deletePost,getUserPost, uploadProfileImage, getAllProfilePics,getAllCoverPics, deleteAllProfilePics,uploadPostImage}