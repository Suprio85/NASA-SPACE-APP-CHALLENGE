import { Router } from "express";
import { checkroute } from "../controllers/user.controller.js";

const router = Router();

router.get("/", checkroute);

export default router;