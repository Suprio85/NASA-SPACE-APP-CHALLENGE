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

const upvoteQuestion = async (req, res) => {
    try {
        const { questionId } = req.body;

        // Check if question ID is provided
        if (!questionId) {
            return res.status(400).json({ message: "Question ID is required" });
        }

        // Find the question by ID and increment upvotes
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        return res.status(200).json({
            message: "Question upvoted successfully",
            question: updatedQuestion,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to upvote question", error: error.message });
    }
};

const upvoteAnswer = async (req, res) => {
    try {
        const { answerId } = req.body;

        // Check if answer ID is provided
        if (!answerId) {
            return res.status(400).json({ message: "Answer ID is required" });
        }

        // Find the answer by ID and increment upvotes
        const updatedAnswer = await Answer.findByIdAndUpdate(
            answerId,
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedAnswer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        return res.status(200).json({
            message: "Answer upvoted successfully",
            answer: updatedAnswer,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to upvote answer", error: error.message });
    }
};

const getAnswersByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.body;

        // Check if question ID is provided
        if (!questionId) {
            return res.status(400).json({ message: "Question ID is required" });
        }

        // Find answers associated with the specific question ID, sorted by upvotes
        const answers = await Answer.find({ questionId })
            .sort({ upvotes: -1, createdAt: -1 }) // Sort by upvotes first, then by latest
            .populate("user", "name email") // Optionally populate user details
            .exec();

        return res.status(200).json({
            message: "Answers retrieved successfully",
            answers,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve answers", error: error.message });
    }
};


export { addQuestion,getLatestQuestions,addAnswer,upvoteQuestion,upvoteAnswer,getAnswersByQuestionId };