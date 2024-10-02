import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AddQuiz = () => {
  const [chapters, setChapters] = useState([]);
  const [subChapters, setSubChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSubChapter, setSelectedSubChapter] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [showAddQuizForm, setShowAddQuizForm] = useState(false);

  // Quiz form state
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAns, setCorrectAns] = useState("");

  // Fetch Chapters on component mount
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axiosInstance.get("/chapter/getchapters");
        setChapters(response.data.message);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, []);

  // Fetch SubChapters when a chapter is selected
  useEffect(() => {
    if (selectedChapter) {
      const fetchSubChapters = async () => {
        try {
          const response = await axiosInstance.post("/chapter/getsubchapters", {
            chapterId: selectedChapter,
          });
          setSubChapters(response.data.message);
        } catch (error) {
          console.error("Error fetching subchapters:", error);
        }
      };
      fetchSubChapters();
    }
  }, [selectedChapter]);

  // Fetch Quizzes when a subchapter is selected
  useEffect(() => {
    if (selectedSubChapter) {
      const fetchQuizzes = async () => {
        try {
          const response = await axiosInstance.post("/quiz/getquizzesbysubchapter", {
            subchapterId: selectedSubChapter,
          });
          setQuizzes(response.data.quizzes);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      };
      fetchQuizzes();
    }
  }, [selectedSubChapter]);

  // Handle form submission to add a new quiz
  // Handle form submission to add a new quiz
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/quiz/createorupdate", {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAns,
        subchapter: selectedSubChapter,
      });
  
      if (response.status === 201) {
        const newQuiz = response.data.quiz; // Assuming the newly created quiz is returned in the response
        alert("Quiz added successfully!");
  
        // Append the new quiz to the existing list of quizzes
        setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
  
        // Clear the form
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrectAns("");
        setShowAddQuizForm(false); // Hide the form after submission
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      alert("Error adding quiz");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Quizzes</h1>

      <form className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* Chapter Selection */}
        <div className="mb-4">
          <label htmlFor="chapter" className="block text-gray-700 font-bold mb-2">Select Chapter:</label>
          <select
            id="chapter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select a Chapter--</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                {chapter.title}
              </option>
            ))}
          </select>
        </div>

        {/* SubChapter Selection */}
        <div className="mb-4">
          <label htmlFor="subchapter" className="block text-gray-700 font-bold mb-2">Select SubChapter:</label>
          <select
            id="subchapter"
            value={selectedSubChapter}
            onChange={(e) => setSelectedSubChapter(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select a SubChapter--</option>
            {subChapters.map((subchapter) => (
              <option key={subchapter._id} value={subchapter._id}>
                {subchapter.title}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Display Quizzes */}
      {quizzes.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Existing Quizzes</h2>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-4 rounded shadow-md mb-4">
              <p className="font-bold text-lg">{quiz.question}</p>
              <ul className="list-disc list-inside">
                <li>A: {quiz.optionA}</li>
                <li>B: {quiz.optionB}</li>
                <li>C: {quiz.optionC}</li>
                <li>D: {quiz.optionD}</li>
              </ul>
              <p className="mt-2 font-bold">Correct Answer: {quiz.correctAns}</p>
            </div>
          ))}
        </div>
      )}

      {/* Button to show the Add Quiz Form */}
      {!showAddQuizForm && selectedSubChapter && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setShowAddQuizForm(true)}
        >
          Add Quiz
        </button>
      )}

      {/* Add Quiz Form */}
      {showAddQuizForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mt-4">
          <h2 className="text-2xl font-bold mb-4">Add New Quiz</h2>

          {/* Question Input */}
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question:</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Options Inputs */}
          <div className="mb-4">
            <label htmlFor="optionA" className="block text-gray-700 font-bold mb-2">Option A:</label>
            <input
              type="text"
              id="optionA"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="optionB" className="block text-gray-700 font-bold mb-2">Option B:</label>
            <input
              type="text"
              id="optionB"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="optionC" className="block text-gray-700 font-bold mb-2">Option C:</label>
            <input
              type="text"
              id="optionC"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="optionD" className="block text-gray-700 font-bold mb-2">Option D:</label>
            <input
              type="text"
              id="optionD"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Correct Answer Input */}
          <div className="mb-4">
            <label htmlFor="correctAns" className="block text-gray-700 font-bold mb-2">Correct Answer:</label>
            <select
              id="correctAns"
              value={correctAns}
              onChange={(e) => setCorrectAns(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select the Correct Answer--</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddQuiz;
