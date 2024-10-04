import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

//this is used to parse the incoming request with JSON payloads
app.use(express.json());

//this is used to parse the incoming request with urlencoded payloads to accept reach type of data
app.use(express.urlencoded({ extended: true }));

//this is used to parse the incoming request with cookie payloads
app.use(cookieParser());

//this is used to parse the incoming request with json payloads
app.use(bodyParser.json());

//this is used to serve the static files like images 
app.use(express.static('public'));

import userRouter from './routes/user.route.js';
import chatbotRouter from './routes/chatbot.route.js';;
import { errHandeler } from './middlewares/errorHandler.js';
import chapterRouter from './routes/chapter.route.js';
import quizRouter from './routes/quiz.route.js';
import blogRouter from './routes/blog.route.js';
import questionRoter from './routes/question.route.js';

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/chatbot",chatbotRouter);
app.use("/api/v1/chapter",chapterRouter);
app.use("/api/v1/quiz",quizRouter);
app.use("/api/v1/blog",blogRouter);
app.use("/api/v1/question",questionRoter);
app.use(errHandeler);

export default app;