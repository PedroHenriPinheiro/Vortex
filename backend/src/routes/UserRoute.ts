import { Router } from "express";
import { createUser } from "../controllers/UserController.js";

const router = Router();

router.post("/", createUser);


export default router;