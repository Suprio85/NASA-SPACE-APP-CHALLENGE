import Question from "../models/questionSchema.js";
import Answer from "../models/answerSchema.js";
import UpvoteQuestion from "../models/upvoteQuestionSchema.js";

const addQuestion = async (req, res) => {
    try {
        const { text , details } = req.body;
        const userId = req.user._id

        // Check if required fields are present
        if (!text || !userId) {
            return res.status(400).json({ message: "Question text and user ID are required" });
        }

        // Create a new question document
        const newQuestion = new Question({
            text,
            user: userId,
            details,
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        return res.status(201).json({
            message: "Question added successfully",
            question: savedQuestion,
            details
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add question", error: error.message });
    }
};


const getLatestQuestions = async (req, res) => {
    const userId = req.user.id; // assuming you have the authenticated user ID in req.user

    try {
        // Find questions, sort by latest, and populate user details
        const questions = await Question.find()
            .sort({ createdAt: -1 })
            .populate("user", "name email")
            .exec();

        // Check if each question is liked by the user
        const questionsWithLikes = await Promise.all(
            questions.map(async (question) => {
                const isLiked = await UpvoteQuestion.exists({ user: userId, question: question._id });
                return { 
                    ...question.toObject(), 
                    isLiked: !!isLiked // convert to boolean
                };
            })
        );

        return res.status(200).json({
            message: "Questions retrieved successfully",
            questions: questionsWithLikes,
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
    const { questionId } = req.body;
    const userId = req.user.id; // assuming you have the authenticated user ID in req.user

    try {
        // Check if question ID is provided
        if (!questionId) {
            return res.status(400).json({ message: "Question ID is required" });
        }

        // Check if the user has already upvoted the question
        const existingUpvote = await UpvoteQuestion.findOne({ user: userId, question: questionId });

        let updatedQuestion;
        if (existingUpvote) {
            // If already upvoted, remove the upvote and decrement upvotes count
            await UpvoteQuestion.deleteOne({ user: userId, question: questionId });
            updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                { $inc: { upvotes: -1 } },
                { new: true }
            );
        } else {
            // If not yet upvoted, add the upvote and increment upvotes count
            await UpvoteQuestion.create({ user: userId, question: questionId });
            updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                { $inc: { upvotes: 1 } },
                { new: true }
            );
        }

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        return res.status(200).json({
            message: existingUpvote ? "Upvote removed successfully" : "Question upvoted successfully",
            question: updatedQuestion,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to toggle upvote", error: error.message });
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

const getQuestionbyId = async (req, res) => {
    const { questionId } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({
            message: "Question retrieved successfully",
            question,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to retrieve question", error: error.message });
    }
}



export { addQuestion,getLatestQuestions,addAnswer,upvoteQuestion,upvoteAnswer,getAnswersByQuestionId,getQuestionbyId };