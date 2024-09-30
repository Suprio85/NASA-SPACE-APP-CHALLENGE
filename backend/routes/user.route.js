import { Router } from "express";
import { googleLogin, login, register } from "../controllers/user.controller.js";

const router = Router();

router.post("/google-login", googleLogin);

router.post("/login", login);

router.post("/register", register);



export default router;