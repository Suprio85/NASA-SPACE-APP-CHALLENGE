import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChapterComponent from './Chapter';

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch all chapters from the backend and sort them by createdAt
    const fetchChapters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/chapter/getChapters');
        
        // Sort the chapters by createdAt in descending order (newest first)
        const sortedChapters = response.data.message.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setChapters(sortedChapters);
        console.log(sortedChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-slate-200">Course Chapters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <div 
              key={chapter._id} 
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <ChapterComponent chapter={chapter} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No chapters available</p>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
