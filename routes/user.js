const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/user");


router.post("/add-admin",userController.add_admin); 

module.exports = router;