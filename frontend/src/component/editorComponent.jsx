// EditorComponent.js
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
import axiosInstance from "../utils/axiosInstance"; // Ensure your axios instance is correctly imported

const EditorComponent = ({ onSave }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    // Initialize Editor.js with all tools
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      placeholder: "Start writing your content...",
      autofocus: true,
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
                          // Manually insert the image block after successful upload
                          // editorInstance.current.blocks.insert("image", {
                          //   file: {
                          //     url: data.file.url,
                          //   },
                          // });
  
                          resolve({
                            success: 1,
                            file: {
                              url: data.file.url, // Use the correct URL format here
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
  }, []);

  const saveContent = async () => {
    if (editorInstance.current) {
      const content = await editorInstance.current.save();
      console.log("Editor Content: ", content);

      try {
        const response = await axiosInstance.post('/chapter/create', {
          title: "Your SubChapter Title", // Replace with actual title or get from user input
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
