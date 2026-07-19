import express from "express";
import cors from 'cors';
import adRoutes from './routes/AdRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("./ads", adRoutes)

export { app };