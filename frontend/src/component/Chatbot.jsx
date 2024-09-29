import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, UserCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

  const predefinedPrompts = [
    "Summarize this text",
    "Give me some questions based on the text",
    "Explain the main ideas in the text"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (prompt.trim()) {
      const userMessage = { sender: 'user', text: prompt };
      setChatHistory([...chatHistory, userMessage]);

      try {
        const response = await axios.post('http://localhost:5000/api/v1/chatbot', {
          prompt,
        });

        const botMessage = { sender: 'bot', text: response.data.data };
        setChatHistory([...chatHistory, userMessage, botMessage]);
      } catch (error) {
        console.error('Error communicating with chatbot:', error.message);
      }

      setPrompt('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePredefinedPrompt = (predefinedPrompt) => {
    setPrompt(predefinedPrompt);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() =>{console.log("clicked"); setIsOpen(true)}}
          className="fixed z-50 bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Chat
        </button>
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            ref={chatContainerRef}
            className="h-full overflow-y-auto py-4 px-6 space-y-4"
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-end space-x-2 ${
                    chat.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {chat.sender === 'bot' ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                  ) : (
                    <UserCircle className="w-8 h-8 text-blue-500" />
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      chat.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-2 space-y-2">
          <div className="flex flex-wrap gap-2">
            {predefinedPrompts.map((predefinedPrompt, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedPrompt(predefinedPrompt)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {predefinedPrompt}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;