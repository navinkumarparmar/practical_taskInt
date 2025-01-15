const express = require('express');
const apiroutes = express.Router();
const userController = require('../controller/authController')
apiroutes.post('/adminLogin',userController.adminLogin)


module.exports = apiroutes;