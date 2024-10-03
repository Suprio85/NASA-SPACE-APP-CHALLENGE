import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

const BlogCard = () => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">HOT</span>
        <button className="text-gray-400 hover:bg-white hover:text-gray-900 px-2 py-1 rounded transition-colors duration-200">Read post</button>
      </div>
      <h2 className="text-xl font-bold mb-2">5 JavaScript Concepts Every Developer Should Know</h2>
      <div className="flex space-x-2 mb-2">
        <span className="text-gray-400 text-sm">#webdev</span>
        <span className="text-gray-400 text-sm">#javascript</span>
        <span className="text-gray-400 text-sm">+1</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">Sep 26 • 6m read time</p>
      <div className="mb-4">
        <img src="/api/placeholder/400/200" alt="JavaScript concepts" className="w-full h-40 object-cover rounded-lg" />
      </div>
      <div className="flex justify-between text-gray-400">
        <Heart size={20} />
        <MessageCircle size={20} />
        <Bookmark size={20} />
        <Share2 size={20} />
      </div>
    </div>
  );
};

export default BlogCard;