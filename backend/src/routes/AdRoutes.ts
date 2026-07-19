import {Router} from "express";
import {createAd, getAds, getAdById, deleteAd} from "../controllers/AdController.js"

const router = Router();

router.post("/", createAd);

router.get("/", getAds);

router.get("/:id", getAdById);

router.delete("/:id", deleteAd);

export default router;