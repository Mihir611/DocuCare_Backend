const mongoose = require("mongoose");

const heartRateSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  heartRate: { type: Number },
  timestamp: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});
heartRateSchema.set("collection", "HeartRate");
module.exports = mongoose.model("HeartRate", heartRateSchema);