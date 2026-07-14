const express = require('express');
const router = express.Router();
const userController = require('../domains/controllers/user.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// 2.1 Fetch all profiles (with search, filter, pagination checks)
router.get('/all', protectAdmin, userController.getAllUsers);

// 2.2 Deep inspection profile audit route
router.get('/single/:id', protectAdmin, userController.getSingleUser);

// 2.3 Account status modifier (Suspend/Reactivate)
router.put('/status/:id', protectAdmin, userController.updateUserStatus);

// 2.4 Hard structural admin security string override
router.post('/reset-password', protectAdmin, userController.resetUserPassword);

// 2.5 Multi-collection data purging engine channel
router.delete('/delete/:id', protectAdmin, userController.purgeUserAccount);

module.exports = router;