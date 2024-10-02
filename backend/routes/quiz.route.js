import express from "express";
import { createQuiz,getQuizzesBySubChapter} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/createorupdate", createQuiz);  

router.post("/getquizzesbysubchapter", getQuizzesBySubChapter);

export default router;
