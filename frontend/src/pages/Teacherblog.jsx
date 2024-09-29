import React, { useState, useEffect } from "react";
import EditorComponent from "../component/editorComponent";
import axiosInstance from "../utils/axiosInstance"; // Import your axios instance
import "./EditorPage.css";

const EditorPage = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSubChapter, setSelectedSubChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [newChapterTitle, setNewChapterTitle] = useState(""); // State for new chapter title
  const [isCreatingNewChapter, setIsCreatingNewChapter] = useState(false); // State to toggle new chapter input

  useEffect(() => {
    // Fetch chapters from the backend
    const fetchChapters = async () => {
      try {
        const response = await axiosInstance.get("/chapter/getchapters");
        const fetchedChapters = response.data.message.map((chapter) => ({
          id: chapter._id,
          title: chapter.title,
          subchapters: chapter.subChapters.map((subchapter) => ({
            id: subchapter._id,
            title: subchapter.title,
          })),
        }));
        setChapters(fetchedChapters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  const handleChapterChange = (e) => {
    const value = e.target.value;
    if (value === "new-chapter") {
      setIsCreatingNewChapter(true); // Enable new chapter input
      setSelectedChapter(""); // Reset selected chapter
      setSelectedSubChapter(""); // Reset selected subchapter
    } else {
      setIsCreatingNewChapter(false); // Disable new chapter input
      setSelectedChapter(value);
      setSelectedSubChapter("");
    }
  };

  const handleSubChapterChange = (e) => {
    const value = e.target.value;
    if (value === "new-subchapter") {
      const newSubChapterTitle = prompt("Enter new subchapter title:");
      if (newSubChapterTitle) {
        const updatedChapters = chapters.map((chapter) => {
          if (chapter.id === selectedChapter) {
            const newSubChapter = {
              id: chapter.subchapters.length + 1,
              title: newSubChapterTitle,
            };
            return {
              ...chapter,
              subchapters: [...chapter.subchapters, newSubChapter],
            };
          }
          return chapter;
        });
        setChapters(updatedChapters);
        setSelectedSubChapter(updatedChapters.subchapters.length);
      }
    } else {
      setSelectedSubChapter(value);
    }
  };

  const handleSave = (content) => {
    console.log("Editor Content: ", content);
    // You can now send the content to your backend or save it to the database
  };

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter = {
        id: chapters.length + 1, // You may want to handle the ID generation better, e.g., from the backend
        title: newChapterTitle,
        subchapters: [],
      };
      setChapters([...chapters, newChapter]);
      setSelectedChapter(newChapter.id);
      setNewChapterTitle(""); // Clear the input field
      setIsCreatingNewChapter(false); // Hide the input field after adding the chapter
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add loading state while fetching data
  }

  return (
    <div className="w-screen h-screen m-0 p-0 flex flex-col overflow-hidden">
      <div className="p-5">
        <label htmlFor="chapters" className="block mb-2">
          Select Chapter:
        </label>
        <select
          id="chapters"
          value={selectedChapter}
          onChange={handleChapterChange}
          className="mb-5 p-2 border rounded"
        >
          <option value="" disabled>
            Select a chapter
          </option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.title}
            </option>
          ))}
          <option value="new-chapter" className="text-blue-500 font-bold">
            + Create new chapter
          </option>
        </select>

        {/* Conditionally render the input field if creating a new chapter */}
        {isCreatingNewChapter && (
          <div className="mb-5">
            <input
              type="text"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder="Enter new chapter title"
              className="p-2 border rounded w-full"
            />
            <button
              onClick={handleAddChapter}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Add Chapter
            </button>
          </div>
        )}

        {selectedChapter && !isCreatingNewChapter && (
          <>
            <label htmlFor="subchapters" className="block mb-2">
              Select SubChapter:
            </label>
            <select
              id="subchapters"
              value={selectedSubChapter}
              onChange={handleSubChapterChange}
              className="mb-5 p-2 border rounded"
            >
              <option value="" disabled>
                Select a subchapter
              </option>
              {chapters
                .find((chapter) => chapter.id === selectedChapter)
                .subchapters.map((subChapter) => (
                  <option key={subChapter.id} value={subChapter.id}>
                    {subChapter.title}
                  </option>
                ))}
              <option value="new-subchapter" className="text-blue-500 font-bold">
                + Create new subchapter
              </option>
            </select>
          </>
        )}
      </div>
      <EditorComponent onSave={handleSave} />
    </div>
  );
};

export default EditorPage;
