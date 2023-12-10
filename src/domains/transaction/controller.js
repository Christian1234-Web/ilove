const { updateWalletTransaction } = require("../wallet_transaction/controller");
const Transaction = require("./model");
const PendingTransaction = require("./pendingModel");
const { updateWallet } = require("../wallet/updateWallet");

const createTransaction = async (
  userId,
  id,
  status,
  currency,
  amount,
  name,
  email,
  phone,
  paymentGateway
) => {
  try {
    // create transaction
    const transaction = new Transaction({
      userId,
      transactionId: id,
      name,
      email,
      phone,
      amount,
      currency,
      paymentStatus: status,
      paymentGateway,
    });
    const res = await transaction.save();
    return res;
  } catch (err) {
    throw err;
  }
};
const createPendingTransaction = async (
  senderId,
  receiverId,
  amount,
  senderWalletTransactionId,
  receiverWalletTransactionId
) => {
  try {
    const createPendingTransaction = new PendingTransaction({
      senderId,
      receiverId,
      amount,
      senderWalletTransactionId,
      receiverWalletTransactionId,
    });
    await createPendingTransaction.save();

    return createPendingTransaction;
  } catch (err) {
    throw err;
  }
};
const getSingleTransaction = async (transactionId) => {
  try {
    // get single transaction
    const transaction = await Transaction.findOne({ transactionId });
    return transaction;
  } catch (err) {
    throw err;
  }
};
const getSinglePendingTransaction = async (transactionId) => {
  try {
    // get single transaction
    const transaction = await PendingTransaction.findOne({
      _id: transactionId,
    });
    return transaction;
  } catch (err) {
    throw err;
  }
};
const getPendingTransactionByUserId = async (userIdOne, userIdTwo) => {
  try {
    // Get single transaction
    const transaction = await PendingTransaction.findOne({
      $or: [
        { senderId: userIdOne, receiverId: userIdTwo },
        { senderId: userIdTwo, receiverId: userIdOne },
      ],
    });
    if (transaction) {
      return {
        isPending: true,
        _id: transaction?._id,
        senderId: transaction?.senderId,
        receiverId: transaction?.receiverId,
        senderWalletTransactionId: transaction?.senderWalletTransactionId,
        receiverWalletTransactionId: transaction?.receiverWalletTransactionId,
        amount: transaction?.amount,
        isApproveBySender: transaction?.isApproveBySender,
        isApproveByReceiver: transaction?.isApproveByReceiver,
        currency: transaction?.currency,
        paymentStatus: transaction?.paymentStatus,
        paymentGateway: transaction?.paymentGateway,
        createdAt: transaction?.createdAt,
        updatedAt: transaction?.updatedAt,
        __v: transaction?.__v,
      };
    } else {
      return {
        isPending: false,
        _id: "",
        senderId: "",
        receiverId: "",
        senderWalletTransactionId: "",
        receiverWalletTransactionId: "",
        amount: "",
        isApproveBySender: "",
        isApproveByReceiver: "",
        currency: "",
        paymentStatus: "",
        paymentGateway: "",
        createdAt: "",
        updatedAt: "",
        __v: "",
      };
    }
  } catch (err) {
    // Error will be propagated up the call stack
    throw err;
  }
};

const getAllTransaction = async () => {
  try {
    // get all transaction
    const transaction = await Transaction.find();
    return {
      transaction,
    };
  } catch (err) {
    throw err;
  }
};
const getAllPendingTransaction = async () => {
  try {
    // get all transaction
    const pendingTransaction = await PendingTransaction.find();
    return {
      pendingTransaction,
    };
  } catch (err) {
    throw err;
  }
};
const checkTransactionStatus = async (transaction) => {
  // return message
  if (
    transaction.isApproveByReceiver === true &&
    transaction.isApproveBySender === null
  ) {
    const message = "Transaction Successfully Approved By Receiver";
    return message;
  }
  if (
    transaction.isApproveByReceiver === null &&
    transaction.isApproveBySender === true
  ) {
    const message = "Transaction Successfully Approved By Sender";
    return message;
  }
  if (
    transaction.isApproveByReceiver === false &&
    transaction.isApproveBySender === null
  ) {
    const message = "Transaction Successfully disApproved By Receiver";
    return message;
  }
  if (
    transaction.isApproveByReceiver === null &&
    transaction.isApproveBySender === false
  ) {
    const message = "Transaction Successfully disApproved By Sender";
    return message;
  }

  // make update both approve
  if (
    transaction.isApproveByReceiver === true &&
    transaction.isApproveBySender === true
  ) {
    await updateWallet(transaction.receiverId, transaction.amount);
    await updateWalletTransaction(
      transaction.senderWalletTransactionId,
      "successful"
    );
    await updateWalletTransaction(
      transaction.receiverWalletTransactionId,
      "successful"
    );
    await deleteUserPendingTransaction(transaction._id);
    const message = "Transaction Successfully Completed";
    return message;
  }
  // reciever disapprove and sender approves
  if (
    transaction.isApproveByReceiver === false &&
    transaction.isApproveBySender === true
  ) {
    await updateWallet(transaction.senderId, transaction.amount);
    await updateWalletTransaction(
      transaction.senderWalletTransactionId,
      "failed"
    );
    await updateWalletTransaction(
      transaction.receiverWalletTransactionId,
      "failed"
    );
    await deleteUserPendingTransaction(transaction._id);
    const message =
      "Transaction Failed Due to The Receiver Disapproved The Transaction And The Money Will Be Return Back To the Sender";
    return message;
  }
  // reciever approved and serder disapprove
  if (
    transaction.isApproveByReceiver === true &&
    transaction.isApproveBySender === false
  ) {
    await updateWalletTransaction(
      transaction.senderWalletTransactionId,
      "withhold"
    );
    await updateWalletTransaction(
      transaction.receiverWalletTransactionId,
      "withhold"
    );
    await deleteUserPendingTransaction(transaction._id);
    const message =
      "Transaction Witheld Due to The Receiver Approved The Transaction And Sender Disapprove The Transaction The Money Will Be Withold";
    return message;
  }
  // both disapproves
  if (
    transaction.isApproveByReceiver === false &&
    transaction.isApproveBySender === false
  ) {
    await updateWallet(transaction.senderId, transaction.amount);
    await updateWalletTransaction(
      transaction.senderWalletTransactionId,
      "failed"
    );
    await updateWalletTransaction(
      transaction.receiverWalletTransactionId,
      "failed"
    );
    await deleteUserPendingTransaction(transaction._id);
    const message =
      "Transaction Failed Due to The Receiver and Sender Disapproved The Transaction And The Money Will Be Return Back To the Sender";
    return message;
  }
};
const approvePendingTransaction = async (data) => {
  const { userId, transactionId } = data;
  try {
    // get all transaction
    const transaction = await getSinglePendingTransaction(transactionId);
    const approvingSenderUser = transaction.senderId === userId;
    if (approvingSenderUser === true) {
      transaction.isApproveBySender = true;
      await transaction.save();
    } else {
      transaction.isApproveByReceiver = true;
      await transaction.save();
    }
    const response = checkTransactionStatus(transaction);
    return response;
  } catch (err) {
    throw err;
  }
};
const disApprovePendingTransaction = async (data) => {
  const { userId, transactionId } = data;
  try {
    // get all transaction
    const transaction = await getSinglePendingTransaction(transactionId);
    const approvingSenderUser = transaction.senderId === userId;
    if (approvingSenderUser === true) {
      transaction.isApproveBySender = false;
      await transaction.save();
    } else {
      transaction.isApproveByReceiver = false;
      await transaction.save();
    }
    const response = checkTransactionStatus(transaction);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteUserPendingTransaction = async (transactionId) => {
  try {
    const transaction = await PendingTransaction.findOneAndDelete({
      _id: transactionId,
    });
    return {
      transaction,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTransaction,
  getSinglePendingTransaction,
  deleteUserPendingTransaction,
  checkTransactionStatus,
  getSingleTransaction,
  createTransaction,
  createPendingTransaction,
  approvePendingTransaction,
  disApprovePendingTransaction,
  getPendingTransactionByUserId,
  getAllPendingTransaction,
};
