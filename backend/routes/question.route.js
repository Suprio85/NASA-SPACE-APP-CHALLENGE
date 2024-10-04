import express from "express";
import { addQuestion,getLatestQuestions,addAnswer,upvoteQuestion,upvoteAnswer,getAnswersByQuestionId } from "../controllers/question.controller.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.route("/addquestion").post(protect,addQuestion);

router.route("/getlatestquestions").get(protect,getLatestQuestions);

router.route("/addanswer").post(protect,addAnswer);

router.route("/upvotequestion").post(protect,upvoteQuestion);

router.route("/upvoteanswer").post(protect,upvoteAnswer);

router.route("/getanswersbyquestion").post(protect,getAnswersByQuestionId);



export default router;