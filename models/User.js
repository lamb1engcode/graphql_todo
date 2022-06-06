const mongoose = require("mongoose");
const { defaultModel } = require("../config/defineModel");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: defaultModel.stringR,
    password: defaultModel.stringR,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
