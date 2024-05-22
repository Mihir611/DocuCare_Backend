const mongoose = require("mongoose");

const sugarSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  sugarLevel: { type: Number },
  timestamp: { type: Number, default: () => Math.floor(Date.now() / 1000) },
  sugarType: { type: String, enum: ["BF", "AF", "FASTING"] },
});
sugarSchema.set("collection", "Sugar");
module.exports = mongoose.model("Sugar", sugarSchema);
