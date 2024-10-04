import asyncHandler from "express-async-handler";
import Quiz from "../models/quizSchema.js";
import SubChapter from "../models/subChapterSchema.js";

// Controller to create or update a quiz
const createQuiz = asyncHandler(async (req, res) => {
    console.log("reached")
    const { question, optionA, optionB, optionC, optionD, correctAns, subchapter, quizId } = req.body;

    // Check if the subchapter exists
    const existingSubChapter = await SubChapter.findById(subchapter);
    if (!existingSubChapter) {
        res.status(400);
        throw new Error("Subchapter not found");
    }

    let quiz;
    if (quizId) {
        // If quizId is provided, update the existing quiz
        quiz = await Quiz.findById(quizId);
        if (!quiz) {
            res.status(404);
            throw new Error("Quiz not found");
        }

        // Update the quiz fields
        quiz.question = question;
        quiz.optionA = optionA;
        quiz.optionB = optionB;
        quiz.optionC = optionC;
        quiz.optionD = optionD;
        quiz.correctAns = correctAns;
        quiz.subchapter = subchapter;

        // Save the updated quiz
        const updatedQuiz = await quiz.save();

        // Send response with updated quiz
        res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
    } else {
        // If no quizId, create a new quiz
        const newQuiz = new Quiz({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAns,
            subchapter,
        });

        // Save the quiz to the database
        const savedQuiz = await newQuiz.save();

        // Send back a response with the saved quiz
        res.status(201).json({ message: "Quiz created successfully", quiz: savedQuiz });
    }
});

const getQuizzesBySubChapter = asyncHandler(async (req, res) => {
    const { subchapterId } = req.body;

    // Check if the subchapterId is provided
    if (!subchapterId) {
        res.status(400);
        throw new Error("Subchapter ID is required");
    }

    // Check if the subchapter exists
    const existingSubChapter = await SubChapter.findById(subchapterId);
    if (!existingSubChapter) {
        res.status(404);
        throw new Error("Subchapter not found");
    }

    // Find quizzes that belong to the subchapter
    const quizzes = await Quiz.find({ subchapter: subchapterId });

    // Return the quizzes
    res.status(200).json({ quizzes });
});

export {createQuiz,getQuizzesBySubChapter};