const UserOTPVerification = require("./model");
const User = require("../user/model");

const hashData = require("../../util/hashData");
const sendMail = require("../../util/sendMail");
const comparedHashedData = require("../../util/compareHashedData");

const sendOTPVerificationEmail = async ({ userId, email, subject, text }) => {
  console.log(email, "hello");
  try {
    email = email.toLowerCase();
    // mail options
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: text,
    };

    const hashedOTP = await hashData(otp);

    const newOTPVerification = new UserOTPVerification({
      userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    // save otp record
    await newOTPVerification.save();
    await sendMail(mailoptions);
    return {
      userId,
      email,
    };
  } catch (err) {
    throw err;
  }
};

const verifyEmailOTP = async ({ otp, userId }) => {
  try {
    // checking if opt exist
    const userOtpRecords = await UserOTPVerification.find({ userId });
    if (userOtpRecords.length >= 1) {
      const { expiresAt } = userOtpRecords[0];
      const hashedPass = userOtpRecords[0].otp;
      if (expiresAt < Date.now()) {
        //user otp record
        await UserOTPVerification.deleteMany({ userId });
        throw Error("Code has expired. please request again");
      } else {
        const validOtp = await comparedHashedData(otp, hashedPass);
        if (validOtp === false) {
          throw Error("Invalid code passed. Check your inbox");
        } else {
          // verified success
          await User.updateOne({ _id: userId }, { emailVerification: true });
          await UserOTPVerification.deleteMany({ userId });
          return {
            emailerification: "true",
            userId,
          };
        }
      }
    } else {
      throw Error(
        "Account record dosnt exist or has been verified already. please sign up or login "
      );
    }
  } catch (err) {
    throw err;
  }
};
const verifyTransactionOTP = async ({ otp, userId }) => {
  try {
    // checking if opt exist
    const userOtpRecords = await UserOTPVerification.find({ userId });
    if (userOtpRecords.length >= 1) {
      const { expiresAt } = userOtpRecords[0];
      const hashedPass = userOtpRecords[0].otp;
      if (expiresAt < Date.now()) {
        //user otp record
        await UserOTPVerification.deleteMany({ userId });
        throw Error("Code has expired. please request again");
      } else {
        const validOtp = await comparedHashedData(otp, hashedPass);
        if (validOtp === false) {
          throw Error("Invalid code passed. Check your inbox");
        } else {
          // verified success
          await UserOTPVerification.deleteMany({ userId });
          return {
            status: "SUCCESS",
            userId,
          };
        }
      }
    } else {
      throw Error("Account record dosnt exist");
    }
  } catch (err) {
    throw err;
  }
};
module.exports = {
  sendOTPVerificationEmail,
  verifyEmailOTP,
  verifyTransactionOTP,
};
