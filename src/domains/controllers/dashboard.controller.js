const User = require('../user/model');
const Wallet = require('../wallet/model');
const Transaction = require('../transaction/model');
const VerificationRequest = require('../verificationRequest/model');
const Message = require('../message/model');

exports.getDashboardCharts = async (req, res, next) => {
  try {
    const stats = await User.aggregate([
      {
        $facet: {
          // 1. Gender Split Distribution
          genderDistribution: [
            { $group: { _id: "$gender", count: { $sum: 1 } } },
            { $project: { gender: "$_id", count: 1, _id: 0 } }
          ],
          
          // 2. Verification Funnel Stages Drop-off[cite: 1]
          verificationFunnel: [
            {
              $group: {
                _id: null,
                Registered: { $sum: 1 },
                EmailVerified: { 
                  $sum: { $cond: [{ $eq: ["$verificationStatus.email", true] }, 1, 0] } 
                },
                KYCComplete: { 
                  $sum: { $cond: [{ $eq: ["$verificationStatus.kyc", true] }, 1, 0] } 
                }
              }
            },
            {
              $project: {
                _id: 0,
                stages: [
                  { stage: "Registered", count: "$Registered" },
                  { stage: "Email Verified", count: "$EmailVerified" },
                  { stage: "KYC Complete", count: "$KYCComplete" }
                ]
              }
            }
          ],

          // 3. User Growth Timeline by Month[cite: 1]
          userGrowth: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                value: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } },
            { $project: { date: "$_id", value: 1, _id: 0 } }
          ]
        }
      }
    ]);

    // 4. Grab Platform Financials from Wallet Collection concurrently[cite: 1]
    const financialStats = await Wallet.aggregate([
      {
        $group: {
          _id: null,
          totalPlatformBalance: { $sum: "$balance" }
        }
      }
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        userGrowth: stats[0].userGrowth,
        genderDistribution: stats[0].genderDistribution,
        verificationFunnel: stats[0].verificationFunnel[0]?.stages || [],
        totalPlatformBalance: financialStats[0]?.totalPlatformBalance || 0
      }
    });
  } catch (error) {
    next(error);
  }
};



// GET /admin/dashboard/stats[cite: 1]
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Define relative timeframe benchmarks for signups
    const now = new Date();
    
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    
    const startOfMonth = new Date(now);
    startOfMonth.setMonth(startOfMonth.getMonth() - 1);

    // Run all database count/aggregation operations concurrently
    const [
      totalUsers,
      activeUsers,
      newSignupsToday,
      newSignupsWeek,
      newSignupsMonth,
      walletBalances,
      transactionVolume,
      pendingTransactions,
      pendingVerifications,
      activeChats
    ] = await Promise.all([
      // 1. User counts
      User.countDocuments({}),
      User.countDocuments({ active: true }),
      
      // 2. Signup intervals
      User.countDocuments({ createdAt: { $gte: startOfToday } }),
      User.countDocuments({ createdAt: { $gte: startOfWeek } }),
      User.countDocuments({ createdAt: { $gte: startOfMonth } }),

      // 3. Total Platform Balance (Sum of all active wallets)[cite: 1]
      Wallet.aggregate([
        { $group: { _id: null, total: { $sum: "$balance" } } }
      ]),

      // 4. Total Transaction Volume (Sum of all completed flows)[cite: 1]
      Transaction.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),

      // 5. Pending queues & open items
      Transaction.countDocuments({ status: 'pending' }),
      VerificationRequest.countDocuments({ status: 'pending' }),

      // 6. Active unique chat channels (Grouping by distinct chatId strings)
      Message.distinct('chatId')
    ]);

    // Format aggregate pipeline arrays safely to fallback numbers if empty
    const totalPlatformBalance = walletBalances[0]?.total ? parseFloat(walletBalances[0].total.toString()) : 0.00;
    const totalTransactionVolume = transactionVolume[0]?.total || 0.00;

    // Send back the response mapping out your requested JSON structural template[cite: 1]
    return res.status(200).json({
      status: "success",
      data: {
        totalUsers,
        activeUsers,
        newSignupsToday,
        newSignupsWeek,
        newSignupsMonth,
        totalPlatformBalance,
        totalTransactionVolume,
        pendingTransactions,
        pendingVerifications,
        activeChats: activeChats.length // The count of unique active channels[cite: 1]
      }
    });

  } catch (error) {
    next(error);
  }
};