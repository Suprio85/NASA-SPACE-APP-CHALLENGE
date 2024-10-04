import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const SubchapterContent = () => {
  const [blocks, setBlocks] = useState([]);
  const subChapterId = "66f99c78e5ca85e2717f0315"; // Set subchapter id

  // Fetch the content of the subchapter
  useEffect(() => {
    const fetchSubChapterContent = async () => {
      try {
        const response = await axiosInstance.post("/chapter/getsubchaptercontent", {
          subChapterId,
        });

        if (response.data && response.data.success) {
          setBlocks(response.data.message.blocks);
        } else {
          console.error("Error fetching subchapter content:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching subchapter:", error.message);
      }
    };

    fetchSubChapterContent();
  }, [subChapterId]);

  // Function to convert YouTube URL to embeddable URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Rendering blocks with styling
  const renderBlock = (block) => {
    switch (block.type) {
      case "paragraph":
        return <p key={block.id} className="mb-4 text-lg">{block.data.text}</p>;

      case "header":
        return React.createElement(
          `h${block.data.level}`,
          { key: block.id, className: `text-${block.data.level === 1 ? "3xl" : block.data.level === 2 ? "2xl" : "xl"} font-bold mb-4` },
          block.data.text
        );

      case "list":
        return (
          <ul key={block.id} className="list-disc list-inside mb-4">
            {block.data.items.map((item, idx) => (
              <li key={idx} className="text-lg">
                {item}
              </li>
            ))}
          </ul>
        );

      case "image":
        return (
          <div key={block.id} className="mb-6">
            <img src={block.data.file.url} alt={block.data.caption || "Image"} className="w-full rounded" />
            {block.data.caption && <p className="text-center text-sm text-gray-500 mt-2">{block.data.caption}</p>}
          </div>
        );

      case "quote":
        return (
          <blockquote key={block.id} className="border-l-4 border-blue-500 pl-4 italic mb-4">
            <p className="text-lg">{block.data.text}</p>
            {block.data.caption && <cite className="text-right text-sm text-gray-500 block">- {block.data.caption}</cite>}
          </blockquote>
        );

      case "linkTool":
        return (
          <a
            key={block.id}
            href={block.data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {block.data.link}
          </a>
        );

      case "table":
        return (
          <table key={block.id} className="table-auto border-collapse w-full mb-4">
            <tbody>
              {block.data.content.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border px-4 py-2 text-center">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "checklist":
        return (
          <ul key={block.id} className="list-none mb-4">
            {block.data.items.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <input type="checkbox" checked={item.checked} className="mr-2" readOnly />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        );

      case "code":
        return (
          <pre key={block.id} className="bg-gray-100 p-4 rounded mb-4">
            <code>{block.data.code}</code>
          </pre>
        );

      case "delimiter":
        return <hr key={block.id} className="border-t-2 border-gray-300 my-8" />;

      case "warning":
        return (
          <div key={block.id} className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4">
            <strong>{block.data.title}</strong>: {block.data.message}
          </div>
        );

      case "raw":
        return (
          <div key={block.id} className="mb-4">
            <div dangerouslySetInnerHTML={{ __html: block.data.html }} />
          </div>
        );

      case "YoutubeEmbed":
        return (
          <div key={block.id} className="mb-6">
            <iframe
              width="100%"
              height="315"
              src={getYouTubeEmbedUrl(block.data.url)}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {blocks.length > 0 ? (
        blocks.map((block) => renderBlock(block))
      ) : (
        <p className="text-center text-lg text-gray-600">No content available.</p>
      )}
    </div>
  );
};

export default SubchapterContent;
