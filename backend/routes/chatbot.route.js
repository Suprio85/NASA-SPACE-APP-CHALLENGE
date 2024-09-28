import {Router} from "express";
import {chatbot} from "../controllers/chatbot.controller.js";

const router = Router();

router.post("/", chatbot);

export default router;
