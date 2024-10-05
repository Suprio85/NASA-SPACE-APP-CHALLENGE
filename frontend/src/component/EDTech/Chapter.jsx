import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChapterComponent = ({ chapter }) => {
  const [isOpen, setIsOpen] = useState(false); // Control visibility of subchapters
  const [subChapters, setSubChapters] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const toggleSubChapters = async () => {
    setIsOpen(!isOpen);

    // Fetch subchapters if not already fetched and the chapter is clicked
    if (!subChapters.length && !isOpen) {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/chapter/getsubChapters', { chapterId: chapter._id });
        
        // Sort subchapters by createdAt in descending order (newest first)
        const sortedSubChapters = response.data.message.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setSubChapters(sortedSubChapters);
        console.log(sortedSubChapters);
      } catch (error) {
        console.error("Error fetching subchapters:", error);
      }
    }
  };

  // Handle subchapter click and redirect to the SubchapterContent page
  const handleSubChapterClick = (subChapterId) => {
    console.log(subChapterId);
    navigate(`/subchaptercontent/${subChapterId}`); // Redirect to the subchapter route with the subChapterId
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
              <div
                key={subChapter._id}
                className="bg-gray-100 p-3 rounded mb-2 cursor-pointer"
                onClick={() => handleSubChapterClick(subChapter._id)} // Redirect on click
              >
                <h3 className="text-lg font-medium text-gray-800">{subChapter.title}</h3>
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
