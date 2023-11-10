const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const pubRouter = require("./routes/publication");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Heders",
    "Origin,X-Requsted-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});


mongoose
  .connect("mongodb://127.0.0.1:27017/Examen_NodeJs", {
    //useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!", e));
app.use("/auth/user", userRouter);
app.use("/auth/pub", pubRouter);

module.exports = app;
