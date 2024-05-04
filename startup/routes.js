const userRouter = require("../routes/users/userRoutes");
const bloodPressureRouter = require("../routes/home/bloodPressure");
const heartRateRouter = require("../routes/home/heartRate");
const SPO2Router = require("../routes/home/spo2");
const sugarRouter = require("../routes/home/sugar");

const userRoutes = (app) => {
  app.use("/api/users", userRouter);
};

const bloodPressureRoutes = (app) => {
  app.use("/api/home/bp", bloodPressureRouter);
};

const heartRateRoutes = (app) => {
  app.use("/api/home/hr", heartRateRouter);
};

const SPO2Routes = (app) => {
  app.use("/api/home/spo2", SPO2Router);
};

const sugarRoutes = (app) => {
  app.use("/api/home/sugar", sugarRouter);
};

module.exports = function (app) {
  userRoutes(app);
  bloodPressureRoutes(app);
  heartRateRoutes(app);
  SPO2Routes(app);
  sugarRoutes(app);
};
