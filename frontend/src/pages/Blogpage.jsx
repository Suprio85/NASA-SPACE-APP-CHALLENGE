// BlogPage.js
import React from 'react';
import BlogCard from '../component/BlogCard';

const BlogPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Blog Posts</h1>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      {/* You can add more BlogCard components or map through an array of blog posts */}
    </div>
  );
};

export default BlogPage;
