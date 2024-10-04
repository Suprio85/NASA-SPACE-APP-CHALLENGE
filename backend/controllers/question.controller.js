import Question from "../models/questionSchema.js";
import Answer from "../models/answerSchema.js";

const addQuestion = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id

        // Check if required fields are present
        if (!text || !userId) {
            return res.status(400).json({ message: "Question text and user ID are required" });
        }

        // Create a new question document
        const newQuestion = new Question({
            text,
            user: userId,  // Assuming userId is being passed in the request body
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        return res.status(201).json({
            message: "Question added successfully",
            question: savedQuestion,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add question", error: error.message });
    }
};


const getLatestQuestions = async (req, res) => {
    try {
        // Find questions and sort them by the latest first (descending order by createdAt)
        const questions = await Question.find()
            .sort({ createdAt: -1 }) // -1 for descending order
            .populate("user", "name email") // Optionally populate the user reference with specific fields
            .exec();

        return res.status(200).json({
            message: "Questions retrieved successfully",
            questions,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve questions", error: error.message });
    }
};

const addAnswer = async (req, res) => {
    try {
        const { questionId, text } = req.body;
        const userId = req.user._id;

        // Check if required fields are present
        if (!questionId || !text || !userId) {
            return res.status(400).json({ message: "Question ID, answer text, and user ID are required" });
        }

        // Create a new answer document
        const newAnswer = new Answer({
            questionId,
            text,
            user: userId,  // Assuming userId is being passed in the request body
        });

        // Save the answer to the database
        const savedAnswer = await newAnswer.save();

        return res.status(201).json({
            message: "Answer added successfully",
            answer: savedAnswer,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add answer", error: error.message });
    }
};



export { addQuestion,getLatestQuestions,addAnswer };