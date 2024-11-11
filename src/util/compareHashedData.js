const bcrypt = require("bcryptjs")

const comparedHashedData = async (data, hashedData) =>{  
    try{
    const comparedData = await bcrypt.compare(data,hashedData);
    return comparedData;
    }catch(err){
        throw err;
    }
}
module.exports =  comparedHashedData; 