import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";
import generateAiResponse from "../utils/generateAIResponse.js";

const chatbot = asyncHandler(async (req, res) => {
    const prompt = req.body.prompt;
    console.log(prompt);
    console.log(req.body)
    const response = await generateAiResponse(prompt);
    return res.json(new apiResponse(200, response));
});

export { chatbot };