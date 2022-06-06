const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

async function connect() {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("connect database fail!");
  }
}

module.exports = { connect };
