const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth")

router.post("/add-admin",userController.add_admin); 
router.post("/register",userController.register);
router.post("/signin",userController.signin);  
router.patch(
    "/validerauteur/:id",
     authMiddleware.loggedMiddleware,
     authMiddleware.isAdmin,
    userController.validerauteur
  );

  router.post(
    "/ajouter_pub/",
     authMiddleware.loggedMiddleware,
     authMiddleware.isAdmin,
    userController.addPublication
  );

module.exports = router;