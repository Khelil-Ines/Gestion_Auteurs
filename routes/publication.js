const express = require("express");
const router = express.Router();
const Publication = require("../models/publication");
const publicationController = require("../controllers/publication");
const authMiddleware = require("../middlewares/auth")


router.post(
    "/ajouter_pub/",
     authMiddleware.loggedMiddleware,
     authMiddleware.isAdmin,
    userController.addPublication
  );