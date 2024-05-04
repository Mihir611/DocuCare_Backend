const BloodPressure = require("../../models/bloodPressureModel");

const addBloodPressure = async (req, res) => {
  const { user_id, systolic, diastolic } = req.body;

  const bp = new BloodPressure({
    user_id,
    systolic,
    diastolic,
  });
  await bp.save();
  res.status(200).send({
    message: "Blood Pressure added successfully.",
  });
};

const bloodPressureReports = async (req, res) => {
  const userId = req.query.user_id;
  const bp = await BloodPressure.find({ user_id: userId })
    .sort({ timestamp: -1 })
    .limit(10)
    .select("systolic");
  let maxSystolic = 0;
  let minSystolic = 0;
  let avgSystolic = 0;
  if (bp.length > 0) {
    maxSystolic = Math.max(...bp.map((bp) => bp.systolic));
    minSystolic = Math.min(...bp.map((bp) => bp.systolic));
    const sum = bp.reduce((acc, curr) => acc + curr.systolic, 0);
    avgSystolic = sum / bp.length;
  }

  res.status(200).send({
    message: "Success",
    data: {
      max: maxSystolic,
      min: minSystolic,
      avg: avgSystolic,
    },
  });
};

module.exports = {
  addBloodPressure,
  bloodPressureReports,
};
