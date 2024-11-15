const bcrypt = require("bcryptjs")

const hashData = async (data, saltRounds = 10) =>{ 
    try{
    const hashedData = await bcrypt.hash(data,saltRounds);
    return hashedData;
    }catch(err){
        throw err;
    }
}
module.exports =  hashData; 