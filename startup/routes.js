const userRouter = require("../routes/users/userRoutes");

const userRoutes = (app) => {
  app.use("/api/users", userRouter);
};

module.exports = function (app) {
  userRoutes(app);
};
