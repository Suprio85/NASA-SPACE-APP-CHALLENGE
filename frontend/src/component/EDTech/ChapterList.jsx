import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChapterComponent from './Chapter.jsx';

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch all chapters from the backend
    const fetchChapters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/chapter/getChapters');
        setChapters(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Course Chapters</h1>

      <div className="space-y-4">
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <ChapterComponent key={chapter._id} chapter={chapter} />
          ))
        ) : (
          <p className="text-gray-600 text-center">No chapters available</p>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
