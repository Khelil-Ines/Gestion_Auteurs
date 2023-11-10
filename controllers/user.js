const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const add_admin = (req, res) => {
    const role = "admin";
    const statut = "V";
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const admin = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone_num : req.body.phone_num,
          login : req.body.login,
          password: hash,
          role: role,
          statut: statut,
        });
        admin
          .save()
          .then((response) => {
            res.status(201).json({
              user: admin,
              message: "Admin créé !",
            });
          })
          .catch((error) => {
            res
              .status(400)
              .json({ error: error.message, message: "Données invalides" });
          });
      });
    };
    



const register = (req, res, next) => {
    const { lastname, firstname, phone_num, login } = req.body;
    const statut = "EA"
    const password = phone_num;
    const user = new User({ lastname, firstname, phone_num, login, statut });
    user
      .save()
      .then((response) => {
        res.status(201).json({
          models: user,
          message: "Utilisateur créé !",
        });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: error.message, message: "Données invalides" });
      });
  };

  const signin = (req, res, next) => {
    User.findOne({ login: req.body.login })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            error: "User not found",
          });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({
                error: "Mot de passe incorrecte !",
              });
            }
            res.status(200).json({
              token: jwt.sign({ id: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error: error.message }));
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const validerauteur= (req, res, next) => {
    const statut = "V";
    User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found ! " });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            req.user = {
                firstname: user.firstname,
              lastname: user.lastname,
              phone_num : user.phone_num,
              login : user.login,
              password: hash,
              role: user.role,
              statut: statut,
              };
            });
            res.status(200).json({
                model: user,
                message: "User updated!",
              });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

const addPublication = (req, res) => {
    const pub = new Publication(req.body);
    book
      .save()
      .then(() => {
        res.status(201).json({
          model: book,
          message: "object créé ",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "erreur d'extraction ",
        });
      });
  };
  module.exports = { add_admin, register, signin, validerauteur };