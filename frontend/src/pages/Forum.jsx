import React, { useState } from "react";
import { ArrowUp } from 'lucide-react';

const dummyQuestions = [
  {
    id: 1,
    title: "How to use React useState Hook?",
    answers: 5,
    upvotes: 10,
    tags: ["React"],
    askedTime: "2 hours ago",
    author: "reactNewbie"
  },
  {
    id: 2,
    title: "What is the difference between var, let, and const?",
    answers: 2,
    upvotes: 15,
    tags: ["JavaScript"],
    askedTime: "1 day ago",
    author: "jsLearner"
  },
  {
    id: 3,
    title: "How to center a div in CSS?",
    answers: 8,
    upvotes: 25,
    tags: ["CSS"],
    askedTime: "3 days ago",
    author: "cssGuru"
  },
  {
    id: 4,
    title: "How to connect to MongoDB in Node.js?",
    answers: 1,
    upvotes: 5,
    tags: ["Node.js", "MongoDB"],
    askedTime: "1 week ago",
    author: "backendDev"
  },
];

const SidebarMenu = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white h-screen p-4">
      <div
        className={`cursor-pointer p-2 mb-4 rounded ${
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
  return (
    <div className="border-t border-gray-300 py-3 px-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-4 text-xs text-gray-600">
          <div className="flex flex-col items-center mb-2">
            <button className="text-gray-400 hover:text-orange-400">
              <ArrowUp size={18} />
            </button>
            <span className="font-medium">{question.upvotes}</span>
          </div>
          <span>{question.answers} answers</span>
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 mb-1">
            <a href="#">{question.title}</a>
          </h3>
          <div className="flex items-center text-xs text-gray-600">
            <span className="mr-2">asked {question.askedTime}</span>
            <span className="mr-2">by {question.author}</span>
            {/* {question.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-sm mr-1">
                {tag}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Forum = () => {
  const [selectedOption, setSelectedOption] = useState("questions");

  return (
    <div className="flex h-screen font-Saira">
      <SidebarMenu
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="w-4/5 p-6 bg-slate-300">
        {selectedOption === "questions" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Questions</h2>
            <div>
              {dummyQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
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