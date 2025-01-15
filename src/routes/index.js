
const express = require('express');
const apiroutes = express.Router();
const User = require('./userRoutes');
const Auth = require('./authRoutes');
apiroutes.use('/user',User);
apiroutes.use('/auth',Auth);

module.exports = apiroutes;

