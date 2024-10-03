import React from "react";
import EditorComponent from "../component/editorComponent";

const BlogPage = () => {
  const handleSave = (content) => {
    console.log("Blog Content Saved:", content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col text-white">
      <header className="bg-gray-800 shadow-md py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-100">Create a Blog Post</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <EditorComponent onSave={handleSave} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          © 2024 Your Blog Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;