const Sugar = require("../../models/sugarModel");

const addSugar = async (req, res) => {
  const { user_id, sugarLevel, sugarType } = req.body;
  const sugar = new Sugar({
    user_id,
    sugarLevel,
    sugarType,
  });
  try {
    await sugar.save();
  } catch (err) {
    res.send({message: err.message });
  }
  res.status(200).send({
    message: "Sugar level added successfully",
  });
};

const sugarReports = async (req, res) => {
  const userId = req.query.user_id;
  const beforeFood = await Sugar.find({ user_id: userId, sugarType: "BF" })
    .sort({ timestamp: -1 })
    .limit(10);
  const afterFood = await Sugar.find({ user_id: userId, sugarType: "AF" })
    .sort({ timestamp: -1 })
    .limit(10);
  const fasting = await Sugar.find({ user_id: userId, sugarType: "FASTING" })
    .sort({ timestamp: -1 })
    .limit(10);

  res.status(200).send({
    message: "Success",
    data: {
      beforeFood: beforeFood,
      afterFood: afterFood,
      fasting: fasting,
    },
  });
};

module.exports = {
  addSugar,
  sugarReports,
};
