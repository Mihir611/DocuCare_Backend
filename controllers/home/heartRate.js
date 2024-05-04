const HeartRate = require("../../models/heartRateModel");

const addHeartRate = async (req, res) => {
  const { user_id, heartRate } = req.body;

  const hr = new HeartRate({
    user_id,
    heartRate,
  });

  await hr.save();
  res.status(200).send({
    message: "Heart rate added successfully",
  });
};

const heartRateReports = async (req, res) => {
  const userId = req.query.user_id;
  const hr = await HeartRate.find({ user_id: userId })
    .sort({ timestamp: -1 })
    .limit(10)
    .select("heartRate");
  let maxHeartRate = 0;
  let minHeartRate = 0;
  let avgHeartRate = 0;
  if (hr.length > 0) {
    maxHeartRate = Math.max(...hr.map((hr) => hr.heartRate));
    minHeartRate = Math.min(...hr.map((hr) => hr.heartRate));
    const sum = hr.reduce((acc, curr) => acc + curr.heartRate, 0);
    avgHeartRate = sum / hr.length;
  }

  res.status(200).send({
    message: "Success",
    data: {
      max: maxHeartRate,
      min: minHeartRate,
      avg: avgHeartRate,
    },
  });
};

module.exports = {
  addHeartRate,
  heartRateReports
};
