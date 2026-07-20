import express from "express";
import cors from "cors";

import adRoutes from "./routes/AdRoutes.js";
import userRoutes from "./routes/UserRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ads", adRoutes);
app.use("/users", userRoutes);

export { app };