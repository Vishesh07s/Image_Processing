import express from "express";
import imageRoutes from "./routes/image.routes.js";
import jobRoutes from "./routes/job.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api/images", imageRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);

export default app;
