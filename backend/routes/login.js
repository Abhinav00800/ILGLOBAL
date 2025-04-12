const express=require("express")
const router= express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {LoginController}= require('../controllers/login.js')

router.post('/',LoginController)

module.exports=router;