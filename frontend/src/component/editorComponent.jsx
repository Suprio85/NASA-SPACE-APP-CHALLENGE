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
  const [thumbnail, setThumbnail] = useState("");

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
              captionPlaceholder: "Type caption (optional)",
              actions: [
                {
                  name: 'textSize',
                  icon: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 5h-4v2h4v8h-4v2h10v-2h-4V5zM5 5v2h4v8H5v2h10v-2h-4V7h4V5H5z"/></svg>',
                  title: 'Select Text Size',
                  onClick: (api) => {
                    const wrapper = api.wrapper;
                    const captionInput = wrapper.querySelector('.cdx-input');
                    const select = document.createElement('select');
                    select.innerHTML = `
                      <option value="small">Small</option>
                      <option value="medium" selected>Medium</option>
                      <option value="large">Large</option>
                    `;
                    select.style.marginLeft = '10px';
                    select.addEventListener('change', (e) => {
                      captionInput.style.fontSize = e.target.value === 'small' ? '12px' : e.target.value === 'medium' ? '16px' : '20px';
                    });
                    wrapper.appendChild(select);
                  }
                }
              ]
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
            const { blocks, thumbnail } = response.data.message;
            console.log("Blocks received:", blocks);
            setThumbnail(thumbnail);
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

  const uploadThumbnail = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://localhost:3000/api/v1/chapter/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setThumbnail(data.file.url);
      } else {
        console.error("Thumbnail upload failed");
      }
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    }
  };

  const saveContent = async () => {
    if (editorInstance.current) {
      const content = await editorInstance.current.save();
      console.log("Editor Content: ", content);

      try {
        let response;
        if (selectedSubChapterId) {
          response = await axiosInstance.post('/chapter/create', {
            subChapterId: selectedSubChapterId,
            blocks: content.blocks,
            thumbnail,
          });
          console.log("SubChapter saved:", response.data);
        } else {
          response = await axiosInstance.post('/blog/create', {
            title,
            blocks: content.blocks,
            thumbnail,
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
        /* ... (existing styles remain the same) */
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
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300">
              Thumbnail Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadThumbnail(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-600"
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="mt-2 max-w-xs rounded shadow-lg"
              />
            )}
          </div>
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