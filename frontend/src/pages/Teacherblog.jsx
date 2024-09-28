import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Warning from '@editorjs/warning';
import Raw from '@editorjs/raw';
import './EditorPage.css'; 
import YoutubeEmbed from 'editorjs-youtube-embed';

const EditorPage = () => {
  const editorInstance = useRef(null);

  useEffect(() => {
    // Initialize Editor.js with all tools
    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Start writing your content...',
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true, 
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3], 
            defaultLevel: 2, 
          },
        },
        list: List,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your backend URL-based image handler
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
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote’s author',
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend URL-based link handler
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
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
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
            console.error('Editor.js cleanup error: ', error);
          });
      }
    };
  }, []);

  const saveContent = async () => {
    if (editorInstance.current) {
      const content = await editorInstance.current.save();
      console.log('Editor Content: ', content);
      // You can now send the content to your backend or save it to the database
    }
  };

  return (
    <div className="w-screen h-screen m-0 p-0 flex flex-col overflow-hidden">
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

export default EditorPage;
