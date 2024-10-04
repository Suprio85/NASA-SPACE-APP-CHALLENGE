
import React from "react";

const renderBlock = (block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={block.id} className="mb-4 text-lg text-gray-300">
            {block.data.text}
          </p>
        );

      case "header":
        return React.createElement(
          `h${block.data.level}`,
          {
            key: block.id,
            className: `${
              block.data.level === 1 ? "text-center" : "text-left"
            } font-bold mb-6 text-white text-${
              block.data.level === 1
                ? "8xl"
                : block.data.level === 2
                ? "7xl"
                : "6xl"
            }`,
            style: {
              fontSize:
                block.data.level === 1
                  ? "4rem"
                  : block.data.level === 2
                  ? "3rem"
                  : "2rem",
            },
          },
          block.data.text
        );

      case "list":
        return (
          <ul
            key={block.id}
            className="list-disc list-inside mb-4 text-gray-300"
          >
            {block.data.items.map((item, idx) => (
              <li key={idx} className="text-lg">
                {item}
              </li>
            ))}
          </ul>
        );

        case "image":
          // If there is a caption
          if (block.data.caption) {
            return (
              <div key={block.id} className="mb-6 flex items-start space-x-4">
                <img
                  ref={imgRef}
                  src={block.data.file.url}
                  alt={block.data.caption || "Image"}
                  className="max-w-1/2 object-contain rounded"
                  onLoad={handleImageLoad}
                  style={{
                    width: '50%', // Image takes up 50% of the width if caption exists
                    height: 'auto',
                    maxHeight: '400px', // Limit the height
                  }}
                />
                <p
                  className="flex-1 text-lg text-gray-300 self-center"
                  dangerouslySetInnerHTML={{ __html: block.data.caption }}
                ></p>
              </div>
            );
          }
        
          // If there is no caption
          return (
            <div key={block.id} className="mb-6 flex justify-center">
              <img
                ref={imgRef}
                src={block.data.file.url}
                alt="Image"
                className="w-3/5 object-contain rounded" // 60% width for images without captions
                onLoad={handleImageLoad}
                style={{
                  width: '35%', // Image takes up 60% of the width without captions
                  height: 'auto',
                }}
              />
            </div>
          );
      case "quote":
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-300"
          >
            <p className="text-lg">{block.data.text}</p>
            {block.data.caption && (
              <cite className="text-right text-sm text-gray-500 block">
                - {block.data.caption}
              </cite>
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
            className="text-blue-500 underline"
          >
            {block.data.link}
          </a>
        );

      case "table":
        return (
          <table
            key={block.id}
            className="table-auto border-collapse w-full mb-4 text-gray-300"
          >
            <tbody>
              {block.data.content.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border px-4 py-2 text-center"
                    >
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
          <ul key={block.id} className="list-none mb-4 text-gray-300">
            {block.data.items.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  className="mr-2"
                  readOnly
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        );

      case "code":
        return (
          <pre
            key={block.id}
            className="bg-gray-800 text-gray-300 p-4 rounded mb-4"
          >
            <code>{block.data.code}</code>
          </pre>
        );

      case "delimiter":
        return (
          <div key={block.id} className="my-8">
            <br />
            <br />
          </div>
        );

      case "warning":
        return (
          <div
            key={block.id}
            className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4"
          >
            <strong>{block.data.title}</strong>: {block.data.message}
          </div>
        );

      case "raw":
        return (
          <div key={block.id} className="mb-4 text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: block.data.html }} />
          </div>
        );

      case "YoutubeEmbed":
        return (
          <div key={block.id} className="mb-6 relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
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

  export default renderBlock;