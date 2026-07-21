import { Router } from "express";
import { getMeService } from "../services/MeService.js";

const router = Router();

router.get("/", getMeService);

export default router;
