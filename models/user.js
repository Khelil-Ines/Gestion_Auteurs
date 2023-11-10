const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone_num: { type: Number, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "author"],
    default: "author",
  },
  statut: {
    type: String,
    required: true,
    enum: ["EA", "V"],
    default: "EA",
  },
        publications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' 
 }],
});
module.exports = mongoose.model("User", userSchema);
