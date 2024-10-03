import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-sm hover:bg-gray-700 transition duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
        <button className="text-gray-400 hover:bg-white hover:text-gray-900 px-2 py-1 rounded transition-colors duration-200">
          Read post
        </button>
      </div>
      <h2 className="text-xl font-bold mb-2">{post.title}</h2> {/* Render the title from the post */}
      <p className="text-gray-400 text-sm mb-4">
        {new Date(post.createdAt).toLocaleDateString()} • {post.readTime} read time {/* Format date and display read time */}
      </p>
      <div className="mb-4">
        <img src={post.thumbnail || '/api/placeholder/400/200'} alt={post.title} className="w-full h-40 object-cover rounded-lg" /> {/* Render thumbnail, fallback to placeholder */}
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
