import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

const SubchapterContent = () => {
  const [blocks, setBlocks] = useState([]);
  const [sections, setSections] = useState([]);
  const subChapterId = "66fe37bdf1256c8932d9ef30"; // Subchapter ID

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

  useEffect(() => {
    const newSections = [];
    let currentSection = [];

    blocks.forEach((block) => {
      if (block.type === "delimiter") {
        if (currentSection.length > 0) {
          newSections.push(currentSection);
          currentSection = [];
        }
      } else {
        currentSection.push(block);
      }
    });

    if (currentSection.length > 0) {
      newSections.push(currentSection);
    }

    setSections(newSections);
  }, [blocks]);

  const getYouTubeEmbedUrl = useCallback((url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }, []);

  const renderBlock = useCallback((block, index, isInFlexbox = false) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={block.id}
            className={`mb-4 text-lg leading-relaxed text-gray-700 ${isInFlexbox ? 'flex-1' : ''}`}
          >
            {block.data.text}
          </p>
        );

      case "header":
        const headerSizes = {
          1: "text-4xl",
          2: "text-3xl",
          3: "text-2xl",
          4: "text-xl",
          5: "text-lg",
          6: "text-base"
        };
        return React.createElement(
          `h${block.data.level}`,
          { key: block.id, className: `${headerSizes[block.data.level]} font-bold mb-6 text-gray-800` },
          block.data.text
        );

      case "list":
        return (
          <ul key={block.id} className="list-disc list-inside mb-6 pl-5">
            {block.data.items.map((item, idx) => (
              <li key={`${block.id}-${idx}`} className="text-lg mb-2 text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        );

      case "image":
      case "YoutubeEmbed":
        const content = block.type === "image" ? (
          <div className="mb-4">
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              className="rounded-lg shadow-md max-w-full h-auto"
            />
            {block.data.caption && (
              <p className="text-center text-sm text-gray-500 mt-2">{block.data.caption}</p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <iframe
              width="100%"
              height="315"
              src={getYouTubeEmbedUrl(block.data.url)}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            />
          </div>
        );

        return (
          <div key={block.id} className={isInFlexbox ? "w-1/2 pr-4" : "mb-8 w-full"}>
            {content}
          </div>
        );

      case "quote":
        return (
          <blockquote key={block.id} className="border-l-4 border-blue-500 pl-4 italic mb-6 py-2 bg-blue-50 rounded">
            <p className="text-lg text-gray-700">{block.data.text}</p>
            {block.data.caption && (
              <cite className="text-right text-sm text-gray-500 block mt-2">- {block.data.caption}</cite>
            )}
          </blockquote>
        );

      case "linkTool":
        return (
          <a
            key={block.id}
            href={block.data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline mb-4 inline-block"
          >
            {block.data.link}
          </a>
        );

      case "table":
        return (
          <div key={block.id} className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <tbody>
                {block.data.content.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2 text-sm text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "checklist":
        return (
          <ul key={block.id} className="list-none mb-6">
            {block.data.items.map((item, idx) => (
              <li key={`${block.id}-${idx}`} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  className="mr-2 form-checkbox h-5 w-5 text-blue-600"
                  readOnly
                />
                <span className="text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        );

      case "code":
        return (
          <pre key={block.id} className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
            <code className="text-sm font-mono">{block.data.code}</code>
          </pre>
        );

      case "warning":
        return (
          <div
            key={block.id}
            className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-6 rounded-r-lg"
          >
            <strong className="font-semibold">{block.data.title}</strong>: {block.data.message}
          </div>
        );

      case "raw":
        return (
          <div key={block.id} className="mb-6">
            <div dangerouslySetInnerHTML={{ __html: block.data.html }} />
          </div>
        );

      default:
        return null;
    }
  }, [getYouTubeEmbedUrl]);

  const renderSection = useCallback(
    (section, index) => {
      const hasImage = section.some((block) => block.type === "image" || block.type === "YoutubeEmbed");

      if (hasImage) {
        const imageBlock = section.find((block) => block.type === "image" || block.type === "YoutubeEmbed");
        const otherBlocks = section.filter((block) => block !== imageBlock);

        return (
          <div key={index} className="flex flex-wrap mb-8">
            {renderBlock(imageBlock, 0, true)}
            <div className="w-1/2 pl-4">
              {otherBlocks.map((block, idx) => renderBlock(block, idx, true))}
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="mb-8">
            {section.map((block, idx) => renderBlock(block, idx))}
          </div>
        );
      }
    },
    [renderBlock]
  );

  return (
    <div className="p-8 max-w-full mx-auto bg-white shadow-lg rounded-lg">
      {sections.length > 0 ? (
        sections.map((section, index) => renderSection(section, index))
      ) : (
        <p className="text-center text-lg text-gray-600">No content available.</p>
      )}
    </div>
  );
};

export default SubchapterContent;
