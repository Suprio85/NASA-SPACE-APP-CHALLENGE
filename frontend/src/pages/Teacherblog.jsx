import React, { useState, useEffect } from "react";
import EditorComponent from "../component/editorComponent";
import axiosInstance from "../utils/axiosInstance";
import "./EditorPage.css";

const EditorPage = () => {
  const [chapters, setChapters] = useState([]);
  const [subChapters, setSubChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSubChapter, setSelectedSubChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isCreatingNewChapter, setIsCreatingNewChapter] = useState(false);
  const [newSubChapterTitle, setNewSubChapterTitle] = useState(""); // State for new subchapter title
  const [isCreatingNewSubChapter, setIsCreatingNewSubChapter] = useState(false); // State to toggle new subchapter input

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axiosInstance.get("/chapter/getchapters");
        const fetchedChapters = response.data.message.map((chapter) => ({
          id: chapter._id,
          title: chapter.title,
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

  const handleChapterChange = async (e) => {
    const chapterId = e.target.value;
    if (chapterId === "new-chapter") {
      setIsCreatingNewChapter(true);
      setSelectedChapter("");
      setSelectedSubChapter("");
      setSubChapters([]);
    } else {
      setIsCreatingNewChapter(false);
      setSelectedChapter(chapterId);
      setSelectedSubChapter("");
  
      try {
        const response = await axiosInstance.post(`/chapter/getsubchapters`, {
          chapterId: chapterId,
        });
        const fetchedSubChapters = response.data.message.map((subchapter) => ({
          id: subchapter._id,
          title: subchapter.title,
        }));
        setSubChapters(fetchedSubChapters);
      } catch (error) {
        console.error("Error fetching subchapters:", error);
      }
    }
  };

  const handleSubChapterChange = async (e) => {
    const value = e.target.value;
    if (value === "new-subchapter") {
      setIsCreatingNewSubChapter(true); // Show the input field for the new subchapter
    } else {
      setSelectedSubChapter(value);
      setIsCreatingNewSubChapter(false); // Hide the input field if an existing subchapter is selected
    }
  };

  const handleAddSubChapter = async () => {
    if (newSubChapterTitle.trim()) {
      try {
        const response = await axiosInstance.post("/chapter/addsubchapter", {
          title: newSubChapterTitle,
          chapterId: selectedChapter,
        });
        const newSubChapter = response.data.message;

        setSubChapters([...subChapters, { ...newSubChapter }]);
        setSelectedSubChapter(newSubChapter._id);
        setNewSubChapterTitle(""); // Clear the input field
        setIsCreatingNewSubChapter(false); // Hide the input field after adding the subchapter
      } catch (error) {
        console.error("Error adding subchapter:", error);
      }
    }
  };

  const handleAddChapter = async () => {
    if (newChapterTitle.trim()) {
      try {
        const response = await axiosInstance.post("/chapter/addchapter", {
          title: newChapterTitle,
        });
        const newChapter = response.data.message;

        setChapters([...chapters, { ...newChapter }]);
        setSelectedChapter(newChapter._id);
        setNewChapterTitle("");
        setIsCreatingNewChapter(false);
      } catch (error) {
        console.error("Error adding chapter:", error);
      }
    }
  };

  const handleSave = (content) => {
    console.log("Editor Content: ", content);
  };

  if (loading) {
    return <div>Loading...</div>;
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
              {subChapters.map((subChapter) => (
                <option key={subChapter.id} value={subChapter.id}>
                  {subChapter.title}
                </option>
              ))}
              <option value="new-subchapter" className="text-blue-500 font-bold">
                + Create new subchapter
              </option>
            </select>

            {/* Conditionally render the input field if creating a new subchapter */}
            {isCreatingNewSubChapter && (
              <div className="mb-5">
                <input
                  type="text"
                  value={newSubChapterTitle}
                  onChange={(e) => setNewSubChapterTitle(e.target.value)}
                  placeholder="Enter new subchapter title"
                  className="p-2 border rounded w-full"
                />
                <button
                  onClick={handleAddSubChapter}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Add Subchapter
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <EditorComponent onSave={handleSave} />
    </div>
  );
};

export default EditorPage;
