const express = require('express');
const { register, login,forgotpassword } = require('../controller/userController');
const route = express.Router()


route.post('/register',register)
route.post('/login',login)
route.post('/forgotpassword',forgotpassword)


module.exports = route ;