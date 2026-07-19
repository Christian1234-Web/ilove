require ("dotenv").config;
const mongoose = require("mongoose")
const {MONGO} = process.env;

const connectToDB = async () =>{
    try{
        await  mongoose.connect(MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("DB connected");
    }catch(err){
        console.log(err)
    }
}

connectToDB(); 