const mongoose = require("mongoose");
const { defaultModel, defaultStatus } = require("../config/defineModel");
const Schema = mongoose.Schema;

const Todo = new Schema(
  {
    title: defaultModel.stringR,
    description: defaultModel.stringR,
    status: defaultStatus.taskUndone,
    createdBy: defaultModel.stringR,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);
