import { Router } from "express";
import { googleLogin, login, register, authtest } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.post("/google-login", googleLogin);

router.post("/login", login);

router.post("/register", register);

router.get("/test",protect, authtest);



export default router;