import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

//this is used to serve the static files like images 
app.use(express.static('public'));

import userRouter from './routes/user.route.js';

app.use("/api/v1/user",userRouter);

export default app;