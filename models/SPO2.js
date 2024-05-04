const mongoose = require("mongoose");

const SPO2Schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  spo2: { type: Number },
  timestamp: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});
SPO2Schema.set("collection", "SPO2");
module.exports = mongoose.model("SPO2", SPO2Schema);