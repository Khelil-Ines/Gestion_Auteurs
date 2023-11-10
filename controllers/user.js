const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const add_admin = (req, res) => {
    const role = "admin";
    const statut = "V";
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          firstname: req.body.email,
          lastname: req.body.lastname,
          login : req.body.login,
          password: hash,
          role: role,
          statut: statut,
        });
        user
          .save()
          .then((response) => {
            const newUser = response.toObject();
            delete newUser.password;
            res.status(201).json({
              user: newUser,
              message: "Utilisateur créé !",
            });
          })
          .catch((error) => {
            res
              .status(400)
              .json({ error: error.message, message: "Données invalides" });
          });
      });
    };
    



const signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      lastName : req.body.lastName,
      firstName : req.body.firstName,
      role: req.body.role,
    });
    user
      .save()
      .then((response) => {
        const newUser = response.toObject();
        delete newUser.password;
        res.status(201).json({
          user: newUser,
          message: "Utilisateur créé !",
        });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: error.message, message: "Données invalides" });
      });
  });
};

  module.exports = { add_admin, signup };