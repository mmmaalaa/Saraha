import connectDB from "./DB/connection.js";
import userRouter from "./modules/user/user.controller.js";
const bootstrap = async (app, express) => {
  app.use(express.json());
  await connectDB();
  app.use("/api/v1/users", userRouter);

  app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });
  // global error handler
  app.use((error, req, res, next) => {
    res
      .status(error.statusCode || 500)
      .json({
        message: error.message,
        code: error.statusCode || 500,
      });
  });
};

export default bootstrap;