import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import your custom Axios instance

const QuizPage = () => {
  const subchapterId = '66ffbe63ededbf0e6f3837f6';
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Fetch quizzes when the component mounts or subchapterId changes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.post('/quiz/getquizzesbysubchapter', {
          subchapterId: subchapterId,
        });
        setQuizData(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [subchapterId]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  // Handle quiz submission
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz</h1>

      {quizData.length === 0 ? (
        <p className="text-center text-gray-500">Loading quizzes...</p>
      ) : (
        <div className="space-y-8">
          {quizData.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((optionLetter) => {
                  const optionText = quiz[`option${optionLetter}`];
                  const isSelected = selectedAnswers[quiz._id] === optionLetter;
                  const isCorrect = quiz.correctAns === optionLetter;
                  const isIncorrect = submitted && isSelected && !isCorrect;

                  return (
                    <div
                      key={optionLetter}
                      className={`flex items-center p-4 rounded-lg cursor-pointer border 
                        ${submitted && isCorrect ? 'bg-green-100 border-green-300' : ''} 
                        ${isIncorrect ? 'bg-red-100 border-red-300' : 'border-gray-300'}
                        hover:bg-blue-50 transition-all duration-200`}
                      onClick={() => handleAnswerSelect(quiz._id, optionLetter)}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center 
                          ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}
                      >
                        {isSelected && <span className="block w-2 h-2 bg-white rounded-full"></span>}
                      </div>
                      <span className="text-lg">{optionText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
