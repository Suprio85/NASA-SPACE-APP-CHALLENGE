// EditorPage.js
import React from "react";
import EditorComoponent from "../component/editorComponent";
import "./EditorPage.css";

const EditorPage = () => {
  const handleSave = (content) => {
    console.log("Editor Content: ", content);
    // You can now send the content to your backend or save it to the database
  };

  return (
    <div className="w-screen h-screen m-0 p-0 flex flex-col overflow-hidden">
      <EditorComoponent onSave={handleSave} /> {/* Use the Editor component */}
    </div>
  );
};

export default EditorPage;
