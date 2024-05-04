const mongoose = require("mongoose");

const bloodPressureSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  systolic: { type: Number },
  diastolic: { type: Number },
  timestamp: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});
bloodPressureSchema.set("collection", "BloodPressure");
module.exports = mongoose.model("BloodPressure", bloodPressureSchema);
