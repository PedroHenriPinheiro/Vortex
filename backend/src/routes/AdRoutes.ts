import { Router } from "express";
import { createAd, getAds, getAdById, deleteAd, getMyAds, updateAd } from "../controllers/AdController.js";
import { authMiddlewares } from "../middlewares/AuthMiddlewares.js";

const router = Router();

router.get("/my-ads", authMiddlewares, getMyAds);
router.get("/", getAds);
router.get("/:id", getAdById);
router.post("/", authMiddlewares, createAd);
router.put("/:id", authMiddlewares, updateAd);
router.delete("/:id", authMiddlewares, deleteAd);

export default router;