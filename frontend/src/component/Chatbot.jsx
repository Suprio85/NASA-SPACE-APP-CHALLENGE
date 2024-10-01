import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Orbit, Send, UserCircle, X } from 'lucide-react';
import Logo from "../assets/SVG/Ask.svg"
import Avatar from "../assets/SVG/Avatar.svg"
import Avatar2 from "../assets/SVG/Avatar2.svg"
import OrbitName from './orbitName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 z-50 right-10  text-white   focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={Logo} alt="Chatbot" className="w-20 h-20" />
        </button>
      )}
      {
        isOpen && ( <div className='w-screen h-screen fixed top-0 left-0 bg-slate-950 bg-opacity-70 ' style={{zIndex:'500'}}>

        </div>)
      }
      <div
        className={`fixed rounded-2xl m-10 ${isOpen ? 'mr-10' : 'mr-0'} inset-y-0 right-0 w-1/2 bg-slate-950 border-l-2 border-slate-700 shadow-lg transform ${isOpen ? 'translate-x-0 ' : 'translate-x-full '} transition-transform duration-300 ease-in-out flex flex-col`} style={{ zIndex: 1000 }}
      >
        <div className="flex justify-between items-center p-4 border-b  border-slate-600">
          <h2 className="text-lg  flex w-full justify-start items-start gap-2 font-Saira font-bold ml-5">ASK <div className='w-16'><OrbitName/></div></h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faXmark} className="text-white cursor-pointer" />
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
                className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`flex items-end space-x-2 ${chat.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                >
                  {chat.sender === 'bot' ? (
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center text-white  font-bold">
                      <div className=' w-10 h-10'><img src={Avatar} alt="Chatbot" className="" /></div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full  flex items-center mx-2 justify-center text-white font-bold">
                      <div className=' w-10 h-10'><img src={Avatar2} alt="Chatbot" className="" /></div>
                    </div>
                    
                  )}
                  <div
                    className={`w-2/3 px-4 py-2 rounded-lg ${chat.sender === 'user'
                        ? 'bg-slate-900 text-slate-300 font-Saira'
                        : 'bg-slate-700 text-white font-Saira'
                      }`}
                  >
                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-600 pt-3 px-4 py-2 space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {predefinedPrompts.map((predefinedPrompt, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedPrompt(predefinedPrompt)}
                className="bg-slate-800 text-gray-100 font-Saira px-3 py-1 rounded-xl text-sm hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {predefinedPrompt}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2  ">
            <input
              type="text"
              className="flex-1 bg-slate-950 border-2 border-slate-700 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 font-Saira text-white"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSend}
              className=" text-slate-300 rounded-md p-2 hover:text-slate-100 focus:outline-none focus:text-slate-100 "
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