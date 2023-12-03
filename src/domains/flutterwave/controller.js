const axios = require("axios");
const User = require("../user/model");
let Flutterwave = require("../../util/flutterwave");
const { createWalletTransaction } = require("../wallet_transaction/controller");
const {
  getSingleTransaction,
  createTransaction,
} = require("../transaction/controller");
const { updateWallet } = require("../wallet/updateWallet");

// Initialize the flutterwave class
let flutterwave = new Flutterwave(
  process.env.FLUTTERWAVE_V3_SECRET_KEY,
  process.env.FLUTTERWAVE_V3_PUBIC_KEY,
  process.env.FLUTTERWAVE_V3_ENCRYPTION_KEY
);

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
    // For charging Cards
    const payload = {
      email: user.email,
      name: user.username,
      phone_number: user.phone,
      currency,
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      tx_ref: "1a",
      pin,
      amount,
    };
    const response = await flutterwave.chargeCard(payload);
    if (response.success === true) {
      // This is for validating Bank or Card charges
      const data = {
        otp: "12345",
        flw_ref: response.data.flw_ref,
      };
      const res = await flutterwave.validateCharge(data);

      if (res.success === true) {
        // check if transaction id already exist
        const transactionExist = await getSingleTransaction(res.data.id);

        if (transactionExist) {
          throw Error("Transaction Already Exist");
        }
        // create wallet transaction
        await createWalletTransaction(
          user._id,
          res.data.status,
          res.data.currency,
          res.data.amount
        );
        // create transaction
        await createTransaction(
          user._id,
          res.data.id,
          res.data.status,
          res.data.currency,
          res.data.amount,
          user.username,
          user.email,
          user.phone
        );

        // update user wallet
        await updateWallet(user._id, amount);

        return res.data.id;
      }
    } else {
      throw Error(response.message);
    }
  } catch (err) {
    throw err;
  }
};
const verifyPayment = async ({ otp = 12345, flw_ref, userId }) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User not found");
    }
    // This is for validating Bank or Card charges
    const res = await flutterwave.validateCharge({ otp, flw_ref });

    if (res.success === true) {
      // check if transaction id already exist
      const transactionExist = await getSingleTransaction(res.data.id);

      if (transactionExist) {
        throw Error("Transaction Already Exist");
      }
      // create wallet transaction
      await createWalletTransaction(
        user._id,
        res.data.status,
        res.data.currency,
        res.data.amount
      );
      // create transaction
      await createTransaction(
        user._id,
        res.data.id,
        res.data.status,
        res.data.currency,
        res.data.amount,
        user.username,
        user.email,
        user.phone
      );

      // update user wallet
      await updateWallet(user._id, amount);

      return res.data.id;
    }
  } catch (err) {
    throw err;
  }
};
const withdrawFromWallet = async ({
  userId,
  account_bank,
  account_number,
  amount,
  currency = "NGN",
}) => {
  try {
    const user = await User.findOne({ _id: userId });

    // For making Transfers to bank
    const data = {
      account_bank,
      account_number,
      amount,
      currency,
      beneficiary_name: user.username,
    };
    const response = await axios.post(
      "https://api.flutterwave.com/v3/transfers",
      data,
      {
        headers: {
          Authorization: `Bearer FLWSECK_TEST-SANDBOXDEMOKEY-X`,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

const getAllBank = async () => {
  try {
    const response = await axios.get(
      "https://api.flutterwave.com/v3/banks/NG",
      {
        headers: {
          Authorization: "Bearer " + process.env.FLUTTERWAVE_V3_SECRET_KEY,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

module.exports = { fundWallet, withdrawFromWallet, getAllBank, verifyPayment };
