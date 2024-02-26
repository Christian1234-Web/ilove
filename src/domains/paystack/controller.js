const axios = require("axios");
const User = require("../user/model");
const { createWalletTransaction } = require("../wallet_transaction/controller");
const {
  getSingleTransaction,
  createTransaction,
} = require("../transaction/controller");
const { updateWallet } = require("../wallet/updateWallet");
const {
  sendOTPVerificationEmail,
  verifyTransactionOTP,
} = require("../email_verification_otp/controller");
const generateOTP = require("../../util/generateOTP");

// Initialize the paystack class

const fundWallet = async ({
  userId,
  amount,
  currency,
  card_number,
  cvv,
  expiry_month,
  expiry_year,
  pin,
}) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User not found");
    }

    let handler = PaystackPop.setup({
      key: "pk_test_xxxxxxxxxx", // Replace with your public key
      email: document.getElementById("email-address").value,
      amount: document.getElementById("amount").value * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });
    handler.openIframe();
  } catch (err) {
    throw err;
  }
};
// verify payment

const verifyPayment = async (reference, userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User not found");
    }
    const url = `${process.env.PAYSTACK_API_BASE_URL}/transaction/verify/${reference}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    if (res.data.status === true) {
      const amount = res.data.data.amount / 100;

      // check if transaction id already exist
      const transactionExist = await getSingleTransaction(res.data.data.id);
      if (transactionExist) {
        throw Error("Transaction Already Exist");
      }
      // create wallet transaction
      await createWalletTransaction(
        user._id,
        res.data.status === true ? "successful" : "failed",
        res.data.data.currency,
        amount,
        "paystack"
      );
      // create transaction
      await createTransaction(
        user._id,
        res.data.data.id,
        res.data.status === true ? "successful" : "failed",
        res.data.data.currency,
        amount,
        user.username,
        user.email,
        user.phone,
        "paystack"
      );

      // update user wallet
      await updateWallet(user._id, amount);
      return {
        reference: res.data.data.reference,
      };
    } else {
      throw Error(res.data.data.message);
    }
  } catch (err) {
    throw err;
  }
};

const initiateWithrawal = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const otp = await generateOTP();
      const subject = "Verify Your Transaction";
      const text = `<p>
                     Enter <b>${otp}</b> in the app to verify your transaction
                     <p>This code <b>expires in 10 minutes</b>.
                  </p>`;
      const msg = await sendOTPVerificationEmail({
        userId,
        email: user.email,
        subject,
        text,
      });
    }
  } catch (err) {}
};

const withdrawFromWallet = async (data) => {
  const {
    userId,
    account_number,
    amount,
    bank_code,
    otp,
    currency = "NGN",
  } = data;
  const recipientData = { type: "nuban", bank_code, account_number, currency };
  try {
    const verifyTransaction = await verifyTransactionOTP({ otp, userId });
    if (verifyTransaction.status === "SUCCESS") {
      const response = await axios.post(
        `${process.env.PAYSTACK_API_BASE_URL}/transferrecipient`,
        recipientData,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      // console.log(response.data);
      if (response.status === true) {
        const transferData = {
          source: "balance", // You can change this based on your requirements
          reason: "Withdrawal reason",
          amount: amount * 100, // Specify the withdrawal amount in kobo (e.g., 4000 for 50.00 NGN)
          recipient: recipient.data.recipient_code,
        };
        // For making Transfers to bank
        const res = await axios.post(
          `${process.env.PAYSTACK_API_BASE_URL}/transfer`,
          transferData,
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          }
        );
        if (res.data.status === true) {
          return {
            status: "SUCCESS",
            data: res.data.data,
          };
        }
      }
    }
  } catch (err) {
    throw err;
  }
};

const getAllBank = async () => {
  try {
    const response = await axios.get(
      `${process.env.PAYSTACK_API_BASE_URL}/bank`,
      {
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
const getUserBankDetails = async (account_number, bank_code) => {
  try {
    const response = await axios.get(
      `${process.env.PAYSTACK_API_BASE_URL}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fundWallet,
  verifyPayment,
  withdrawFromWallet,
  getAllBank,
  getUserBankDetails,
  initiateWithrawal,
};
