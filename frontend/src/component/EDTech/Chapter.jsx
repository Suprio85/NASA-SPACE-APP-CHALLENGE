import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChapterComponent = ({ chapter }) => {

  console.log(chapter);
  
    // chapter = {
    //     _id: "1",
    //     title: "Chapter 1",
    //     content: "This is chapter 1",
    // }
  const [isOpen, setIsOpen] = useState(false); // Control visibility of subchapters
  const [subChapters, setSubChapters] = useState([]);

  const toggleSubChapters = async () => {
    setIsOpen(!isOpen);

    // Fetch subchapters if not already fetched and the chapter is clicked
    if (!subChapters.length && !isOpen) {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/chapter/getsubChapters', { chapterId: chapter._id });
        setSubChapters(response.data.message);
        console.log(response.data.data.message);
      } catch (error) {
        console.error("Error fetching subchapters:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-4 p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleSubChapters}>
        <h2 className="text-2xl font-semibold text-gray-900">{chapter.title}</h2>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {/* Subchapters Accordion */}
      {isOpen && (
        <div className="mt-4">
          {subChapters.length > 0 ? (
            subChapters.map((subChapter) => (
              <div key={subChapter._id} className="bg-gray-100 p-3 rounded mb-2">
                <h3 className="text-lg font-medium text-gray-800">{subChapter.title}</h3>
                <p className="text-gray-600">{subChapter.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subchapters available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterComponent;
