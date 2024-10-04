import React, { useState, useEffect } from "react";
import { ArrowUp, Plus, X } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

const Button = ({ children, onClick, className, type = "button" }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

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

const QuestionCard = ({ question }) => {
    const [upvotes, setUpvotes] = useState(question.upvotes);
    const [error, setError] = useState(null);
  
    const handleUpvote = async () => {
      try {
        const payload = { questionId: question._id };
        await axiosInstance.post('/question/upvotequestion', payload);
        setUpvotes(upvotes + 1); // Update UI on successful response
      } catch (error) {
        console.error('Failed to upvote:', error);
        setError('Failed to upvote. Please try again later.');
      }
    };
  
    return (
      <div className="border-t border-gray-300 py-3 px-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4 text-xs text-gray-600">
            <div className="flex flex-col items-center mb-2">
              <button onClick={handleUpvote} className="text-gray-400 hover:text-orange-400">
                <ArrowUp size={18} />
              </button>
              <span className="font-medium">{upvotes}</span>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 mb-1">
              <a href="#">{question.text}</a>
            </h3>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">asked {new Date(question.createdAt).toLocaleString()}</span>
              <span className="mr-2">by {question.user.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

const Forum = () => {
  const [selectedOption, setSelectedOption] = useState("questions");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/question/getlatestquestions');
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex h-screen font-Saira absolute top-0 left-0 w-full">
      <SidebarMenu
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="w-4/5 p-6 bg-slate-300">
        {selectedOption === "questions" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Questions</h2>
            {loading ? (
              <p>Loading questions...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div>
                {questions.map((question) => (
                  <QuestionCard key={question._id} question={question} />
                ))}
              </div>
            )}
          </div>
        )}
        {selectedOption === "savedTags" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Saved Tags</h2>
            <p className="text-sm">No saved tags yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;