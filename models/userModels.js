const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.key;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  seceratekey: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

//jwt token generate
userSchema.methods.generatetoken = function () {
  try {
    let userToken = jwt.sign({ _id: this._id }, key);
    return userToken;
  } catch (err) {
    console.log(err);
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
