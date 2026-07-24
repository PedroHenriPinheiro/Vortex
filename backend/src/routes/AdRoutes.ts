import { Router } from "express";
import { createAd, getAds, getAdById, deleteAd, getMyAds, updateAd } from "../controllers/AdController.js";
import { authMiddlewares } from "../middlewares/AuthMiddlewares.js";

const router = Router();

router.post("/", authMiddlewares, createAd);
router.get("/my-ads", authMiddlewares, getMyAds);
router.put("/:id", authMiddlewares, updateAd);
router.get("/", getAds);
router.get("/:id", getAdById);
router.delete("/:id", authMiddlewares, deleteAd);

export default router;