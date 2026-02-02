const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    requied: true,
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
