const SPO2 = require("../../models/SPO2");

const addSPO2 = async (req, res) => {
  const { user_id, spo2 } = req.body;

  const spo2Added = new SPO2({
    user_id,
    spo2,
  });

  await spo2Added.save();
  res.status(200).send({
    message: "SPO2 added successfully",
  });
};

const SPO2Reports = async (req, res) => {
  const userId = req.query.user_id;
  const spo2Data = await SPO2.find({ user_id: userId })
    .sort({ timestamp: -1 })
    .limit(10)
    .select("spo2");
  let maxSPO2 = 0;
  let minSPO2 = 0;
  let avgSPO2 = 0;
  if (spo2Data.length > 0) {
    maxSPO2 = Math.max(...spo2Data.map((spo2Data) => spo2Data.spo2));
    minSPO2 = Math.min(...spo2Data.map((spo2Data) => spo2Data.spo2));
    const sum = spo2Data.reduce((acc, curr) => acc + curr.spo2, 0);
    avgSPO2 = sum / spo2Data.length;
  }

  res.status(200).send({
    message: "Success",
    data: {
      max: maxSPO2,
      min: minSPO2,
      avg: avgSPO2,
    },
  });
};

module.exports = {
    addSPO2,
    SPO2Reports
};
