import express from "express";
import cors from "cors";

import adRoutes from "./routes/AdRoutes.js";
import userRoutes from "./routes/UserRoute.js";
import authRoutes from "./routes/AuthRoutes.js"
import meRoutes from "./routes/MeRoutes.js"

import { authMiddlewares } from "./middlewares/AuthMiddlewares.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(authMiddlewares);

app.use("/ads", adRoutes);
app.use("/me", meRoutes);

export { app };