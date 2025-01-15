const express = require('express');
const apiroutes = express.Router();
const userController = require('../controller/userController')
apiroutes.post('/createCustomer',userController.registerCustomer)
apiroutes.post('/registerAdmin',userController.registerAdmin)
apiroutes.get('/verifyEmail/:token',userController.verifyEmail);

module.exports = apiroutes;