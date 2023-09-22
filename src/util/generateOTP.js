const generateOTP = async () =>{
    try{
        return (otp = `${Math.floor(100000 + Math.random() * 900000)}`);
    }catch(err){
        throw error;
    }
};

module.exports = generateOTP;