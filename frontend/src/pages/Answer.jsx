import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageSquare, Award, ArrowUp, Plus, X } from 'lucide-react';
import EditorComponent from '../component/editorComponent';
import axiosInstance from '../utils/axiosInstance';
import AnswerComponent from '../component/AnswerComponent';
import renderBlock from '../component/renderBlock';

// Button component
const Button = ({ children, onClick, className, type = "button", disabled = false }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// AskQuestionModal component
const AskQuestionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [details, setDetails] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        text: text,
        details: details
      };
      await axiosInstance.post('/question/addquestion', payload);
      setIsOpen(false);
      setText('');
      setDetails('');
    } catch (error) {
      console.error('Failed to submit question:', error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full mb-4"
      >
        <Plus className="inline-block mr-2 h-4 w-4" /> Ask Question
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Ask a Question">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">Question Text</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3 min-h-[2.5rem]"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Question Details</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3 min-h-[4rem]"
              rows="4"
            ></textarea>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Submit Question
          </Button>
        </form>
      </Modal>
    </>
  );
};

// SidebarMenu component
const SidebarMenu = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <AskQuestionModal />
      <div
        className={`cursor-pointer p-2 mb-2 rounded ${
          selectedOption === "questions" ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedOption("questions")}
      >
        Questions
      </div>
      <div
        className={`cursor-pointer p-2 rounded ${
          selectedOption === "savedTags" ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedOption("savedTags")}
      >
        Saved Tags
      </div>
    </div>
  );
};

// Main StackOverflowAnswerPage component
const StackOverflowAnswerPage = () => {
  const questionId = "66ffbc57be252159072fc57d"
  const [selectedOption, setSelectedOption] = useState("questions");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnswer, setNewAnswer] = useState(null);

  useEffect(() => {
      const fetchQuestionAndAnswers = async () => {
          try {
              setLoading(true);
              const questionResponse = await axiosInstance.post("/question/getquestionbyid", {
                  questionId: questionId
              });
              setQuestion(questionResponse.data.question);

              const answersResponse = await axiosInstance.post('/question/getanswersbyquestion', { questionId });
              setAnswers(answersResponse.data.answers);
              setLoading(false);
          } catch (err) {
              console.error('Error fetching data:', err);
              setError('Failed to load question and answers. Please try again later.');
              setLoading(false);
          }
      };

      fetchQuestionAndAnswers();
  }, [questionId]);

  const handleVote = async (answerId) => {
      try {
          // Optimistically update the UI
          setAnswers(prevAnswers => prevAnswers.map(answer => {
              if (answer._id === answerId) {
                  const newUpvotes = answer.isLiked ? answer.upvotes - 1 : answer.upvotes + 1;
                  return {
                      ...answer,
                      upvotes: newUpvotes,
                      isLiked: !answer.isLiked
                  };
              }
              return answer;
          }));

          // Send request to backend
          const response = await axiosInstance.post('/question/upvoteanswer', {
              questionId: questionId,
              answerId: answerId,
          });
          
          // Update with the response from the server to ensure consistency
          setAnswers(prevAnswers => prevAnswers.map(answer => {
              if (answer._id === answerId) {
                  return {
                      ...answer,
                      upvotes: response.data.upvotes,
                      isLiked: response.data.isLiked
                  };
              }
              return answer;
          }));
      } catch (error) {
          console.error('Failed to upvote:', error);
          // Revert the optimistic update if the request fails
          setAnswers(prevAnswers => prevAnswers.map(answer => {
              if (answer._id === answerId) {
                  const newUpvotes = answer.isLiked ? answer.upvotes + 1 : answer.upvotes - 1;
                  return {
                      ...answer,
                      upvotes: newUpvotes,
                      isLiked: !answer.isLiked
                  };
              }
              return answer;
          }));
      }
  };

  const handleNewAnswer = (newAnswerData) => {
      setNewAnswer(newAnswerData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!question) return <div>Question not found</div>;

  return (
      <div className="flex h-screen font-Saira absolute top-0 left-0 w-full">
          <SidebarMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                  <h1 className="text-2xl font-bold mb-4">{question.text}</h1>

                  <h2 className="text-xl font-bold mb-4">{answers.length} Answers</h2>
                  {answers.map(answer => (
                      <div key={answer._id} className="border-t pt-6 mb-6">
                          <div className="flex items-start">
                              <div className="flex flex-col items-center mr-4">
                                  <button 
                                      onClick={() => handleVote(answer._id)} 
                                      className={`hover:text-orange-500 ${answer.isLiked ? 'text-orange-500' : 'text-gray-500'}`}
                                  >
                                      <ChevronUp size={36} />
                                  </button>
                                  <span className="text-xl font-bold my-2">{answer.upvotes}</span>
                              </div>
                              <div className="flex-grow">
                                  {answer.blocks.map(block => renderBlock(block))}
                                  <div className="flex items-center text-sm text-gray-500 mt-4">
                                      <span>Answered by {answer.user.name} at {new Date(answer.createdAt).toLocaleString()}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}

                  <h2 className="text-xl font-bold mb-4">Your Answer</h2>
                  <AnswerComponent onSave={handleNewAnswer} />
              </div>
          </div>
      </div>
  );
};


export default StackOverflowAnswerPage;