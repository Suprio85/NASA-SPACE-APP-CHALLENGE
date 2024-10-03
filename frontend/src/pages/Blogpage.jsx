import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the import path as needed
import BlogCard from '../component/BlogCard';

const LatestBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axiosInstance.get('/blog/getall');
        setBlogPosts(response.data.data); // Assuming your API returns the data in this structure
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Error state
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post._id} post={post} /> // Pass the post data to BlogCard
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogPosts;
