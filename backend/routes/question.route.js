import express from "express";
import { addQuestion,getLatestQuestions,addAnswer } from "../controllers/question.controller.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.route("/addquestion").post(protect,addQuestion);

router.route("/getlatestquestions").get(protect,getLatestQuestions);

router.route("/addanswer").post(protect,addAnswer);

export default router;