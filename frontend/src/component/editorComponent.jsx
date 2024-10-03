import React, { useEffect, useRef, useState } from "react";
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
  const [title, setTitle] = useState("");

  useEffect(() => {
    const initializeEditor = async (blocks = []) => {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your content...",
        autofocus: true,
        data: {
          blocks,
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
          paragraph: { class: Paragraph, inlineToolbar: true },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "http://localhost:8008/fetchUrl",
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

    const fetchSubChapterContent = async () => {
      if (selectedSubChapterId) {
        try {
          const response = await axiosInstance.post("/chapter/getsubchaptercontent", {
            subChapterId: selectedSubChapterId,
          });

          if (response.data && response.data.success) {
            const { blocks } = response.data.message;
            console.log("Blocks received:", blocks);
            initializeEditor(blocks);
          } else {
            console.error("Error fetching subchapter content:", response.data.message);
            initializeEditor();
          }
        } catch (error) {
          console.error("Error fetching subchapter:", error.message);
          initializeEditor();
        }
      } else {
        initializeEditor();
      }
    };

    fetchSubChapterContent();

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
        let response;
        if (selectedSubChapterId) {
          response = await axiosInstance.post('/chapter/updatesubchapter', {
            subChapterId: selectedSubChapterId,
            blocks: content.blocks,
          });
          console.log("SubChapter saved:", response.data);
        } else {
          response = await axiosInstance.post('/blog/create', {
            title,
            blocks: content.blocks,
          });
          console.log("Blog post created:", response.data);
        }
        
        if (onSave) {
          onSave(response.data);
        }
      } catch (error) {
        console.error("Error saving content:", error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <style jsx global>{`
        .codex-editor {
          color: white;
        }
        .ce-block__content, 
        .ce-toolbar__content {
          max-width: calc(100% - 80px) !important;
        }
        .cdx-block {
          max-width: 100% !important;
        }
        .ce-toolbar__plus,
        .ce-toolbar__settings-btn {
          color: white !important;
          background-color: #4B5563 !important;
        }
        .ce-toolbar__plus:hover,
        .ce-toolbar__settings-btn:hover {
          background-color: #6B7280 !important;
        }
        .codex-editor__redactor {
          padding-bottom: 100px !important;
        }
      `}</style>
      {!selectedSubChapterId && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog post title"
            className="w-full p-3 text-xl font-bold bg-transparent text-white border-b-2 border-blue-500 focus:outline-none focus:border-blue-300 transition-all duration-300"
          />
        </div>
      )}
      <div
        id="editorjs"
        className="flex-1 w-full p-20 overflow-y-auto"
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