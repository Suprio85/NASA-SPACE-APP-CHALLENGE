import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, Award, ArrowUp, Plus, X } from 'lucide-react';
import EditorComponent from '../component/editorComponent';
import axiosInstance from '../utils/axiosInstance';

// Button component
const Button = ({ children, onClick, className, type = "button" }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    onClick={onClick}
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
  const [selectedOption, setSelectedOption] = useState("questions");
  const [answers, setAnswers] = useState(dummyAnswers);

  const handleVote = (id, direction) => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer =>
        answer.id === id
          ? { ...answer, votes: answer.votes + (direction === 'up' ? 1 : -1) }
          : answer
      )
    );
  };

  const handleNewAnswer = (newAnswerData) => {
    const newAnswer = {
      id: answers.length + 1,
      body: newAnswerData.blocks[0].data.text, // Simplified for demo
      votes: 0,
      answeredBy: "CurrentUser",
      answeredAt: "just now",
      isAccepted: false
    };
    setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
  };

  return (
    <div className="flex h-screen font-Saira">
      <SidebarMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">{dummyQuestion.title}</h1>
          <div className="flex items-start mb-8">
            <div className="flex flex-col items-center mr-4">
              <button className="text-gray-500 hover:text-orange-500">
                <ChevronUp size={36} />
              </button>
              <span className="text-xl font-bold my-2">{dummyQuestion.votes}</span>
              <button className="text-gray-500 hover:text-orange-500">
                <ChevronDown size={36} />
              </button>
            </div>
            <div>
              <p className="text-gray-700 mb-4">{dummyQuestion.body}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare size={16} className="mr-1" />
                <span className="mr-4">{dummyQuestion.views} views</span>
                <span>Asked by {dummyQuestion.askedBy} {dummyQuestion.askedAt}</span>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">{answers.length} Answers</h2>
          {answers.map(answer => (
            <div key={answer.id} className="border-t pt-6 mb-6">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <button onClick={() => handleVote(answer.id, 'up')} className="text-gray-500 hover:text-orange-500">
                    <ChevronUp size={36} />
                  </button>
                  <span className="text-xl font-bold my-2">{answer.votes}</span>
                  <button onClick={() => handleVote(answer.id, 'down')} className="text-gray-500 hover:text-orange-500">
                    <ChevronDown size={36} />
                  </button>
                  {answer.isAccepted && (
                    <Award size={36} className="text-green-500 mt-2" />
                  )}
                </div>
                <div>
                  <p className="text-gray-700 mb-4">{answer.body}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Answered by {answer.answeredBy} {answer.answeredAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          <EditorComponent onSave={handleNewAnswer} />
        </div>
      </div>
    </div>
  );
};

// Dummy data (same as before)
const dummyQuestion = {
  title: "How to implement a custom text editor in React?",
  body: "I'm trying to create a custom text editor in my React application. I've looked into libraries like Draft.js and Quill, but I'm not sure which one to use or how to get started. Any advice or examples would be greatly appreciated!",
  votes: 10,
  views: 100,
  askedBy: "ReactNewbie",
  askedAt: "2 hours ago"
};

const dummyAnswers = [
  {
    id: 1,
    body: "I recommend using the Editor.js library. It's highly customizable and has a great API. Here's a basic example of how you can implement it in React...",
    votes: 5,
    answeredBy: "ReactExpert",
    answeredAt: "1 hour ago",
    isAccepted: true
  },
  {
    id: 2,
    body: "Another option is to use Slate.js. It's a bit more low-level than Editor.js, but it gives you more control over the editing experience. Here's how you can get started...",
    votes: 2,
    answeredBy: "SlateEnthusiast",
    answeredAt: "30 minutes ago",
    isAccepted: false
  }
];

export default StackOverflowAnswerPage;