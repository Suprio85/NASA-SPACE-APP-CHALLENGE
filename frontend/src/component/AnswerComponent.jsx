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
//add questionId
const AnswerComponent = ({ onSave }) => {
  const questionId="66ffbc57be252159072fc57d"
  const editorInstance = useRef(null);

  useEffect(() => {
    const initializeEditor = async (blocks = []) => {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your content...",
        autofocus: true,
        data: { blocks },
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
                            file: { url: data.file.url },
                          });
                        } else {
                          reject("Upload failed");
                        }
                      })
                      .catch((error) => reject(error));
                  });
                },
              },
              captionPlaceholder: "Type caption (optional)",
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

    initializeEditor();

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
        const response = await axiosInstance.post("/question/addanswer", {
          questionId,
          blocks: content.blocks,
        });
        console.log("Content saved:", response.data);

        if (onSave) {
          onSave(response.data);
        }
      } catch (error) {
        console.error(
          "Error saving content:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <style jsx global>{`
        .codex-editor {
          color: #1a202c;
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
          color: #4a5568 !important;
          background-color: #edf2f7 !important;
        }
        .ce-toolbar__plus:hover,
        .ce-toolbar__settings-btn:hover {
          background-color: #e2e8f0 !important;
        }
        .codex-editor__redactor {
          padding-bottom: 100px !important;
        }
      `}</style>
      <div id="editorjs" className="flex-1 w-full p-20 overflow-y-auto"></div>
      <button
        onClick={saveContent}
        className="fixed bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        Save Content
      </button>
    </div>
  );
};

export default AnswerComponent;
