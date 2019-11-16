const Router = require('express');
const userController = require('./user.controller') 
const router = Router();

router
    .get('/getUserDetail/:userId', userController.getUserDetail)
    .patch('/updateUserById/:userId', userController.updateUserById);

module.exports = router;