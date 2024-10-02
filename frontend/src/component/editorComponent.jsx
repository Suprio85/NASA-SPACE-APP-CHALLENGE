import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Warning from "@editorjs/warning";
import Raw from "@editorjs/raw";
import YoutubeEmbed from "editorjs-youtube-embed";
import axiosInstance from "../utils/axiosInstance"; 

const EditorComponent = ({ onSave, selectedSubChapterId }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    const initializeEditor = async (blocks = []) => {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your content...",
        autofocus: true,
        data: {
          blocks, // Load the previous content into the editor
        },
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
          },
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("avatar", file);

                    fetch("http://localhost:3000/api/v1/chapter/upload", {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.success) {
                          resolve({
                            success: 1,
                            file: {
                              url: data.file.url,
                            },
                          });
                        } else {
                          reject("Upload failed");
                        }
                      })
                      .catch((error) => reject(error));
                  });
                },
              },
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote’s author",
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "http://localhost:8008/fetchUrl", // Your backend URL-based link handler
            },
          },
          table: Table,
          checklist: Checklist,
          code: CodeTool,
          delimiter: Delimiter,
          embed: Embed,
          warning: {
            class: Warning,
            config: {
              titlePlaceholder: "Title",
              messagePlaceholder: "Message",
            },
          },
          raw: Raw,
          YoutubeEmbed: YoutubeEmbed,
        },
      });
    };

    // Fetch existing subchapter content when subChapterId is provided
    const fetchSubChapterContent = async () => {
      if (selectedSubChapterId) {
        try {
          const response = await axiosInstance.post("/chapter/getsubchaptercontent", {
            subChapterId: selectedSubChapterId,
          });

          if (response.data && response.data.success) {
            const { blocks } = response.data.message;
            console.log("Blocks received:", blocks); // Log to verify the blocks data
            initializeEditor(blocks); // Initialize the editor with the fetched content
          } else {
            console.error("Error fetching subchapter content:", response.data.message);
            initializeEditor(); // Initialize the editor with empty content in case of error
          }
        } catch (error) {
          console.error("Error fetching subchapter:", error.message);
          initializeEditor(); // Initialize the editor with empty content in case of error
        }
      } else {
        initializeEditor(); // Initialize the editor with empty content if no subchapterId is provided
      }
    };

    fetchSubChapterContent();

    // Cleanup editor on component unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current.destroy();
          })
          .catch((error) => {
            console.error("Editor.js cleanup error: ", error);
          });
      }
    };
  }, [selectedSubChapterId]);

  const saveContent = async () => {
    if (editorInstance.current) {
      const content = await editorInstance.current.save();
      console.log("Editor Content: ", content);

      try {
        const response = await axiosInstance.post('/chapter/updatesubchapter', {
          subChapterId: selectedSubChapterId,
          blocks: content.blocks,
        });

        console.log("SubChapter saved:", response.data); 
      } catch (error) {
        console.error("Error saving SubChapter:", error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div>
      <div
        id="editorjs"
        className="flex-1 w-full p-20 bg-gray-100 overflow-y-auto"
      ></div>
      <button
        onClick={saveContent}
        className="fixed bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        Save Content
      </button>
    </div>
  );
};

export default EditorComponent;
