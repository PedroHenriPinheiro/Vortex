import { Router } from "express";
import { getMe } from "../controllers/MeController.js";

const router = Router();

router.get("/", getMe);

export default router;