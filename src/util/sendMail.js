const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
host: "gmail",
auth: {
user: process.env.AUTH_EMAIL,
pass: process.env.AUTH_PASS,
}
});

// testing success
transporter.verify((error, success) =>{
if(error) {
console.log(error,'errorSS');
} else {
console.log("Ready for messages");
console.log(success);
}
});

const sendMail = async (mailOptions) =>{ 
    try{
        const emailsent = await transporter.sendMail(mailOptions);
        return emailsent;

    }catch(err){
        throw err;
    }
}

module.exports = sendMail;