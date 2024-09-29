import React from 'react';

const Chapter = ({ title, story, image, dir }) => {
    const renderStoryWithLineBreaks = (story) => {
        return story.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="mx-60 mt-20">
            <div>
                <div className="text-3xl text-white font-Saira font-bold">{title}</div>
                <div className={`flex items-center mt-10 ${dir === "ltr" ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center mt-10">
                        <img src={image} alt="Chapter Illustration" className="w-full mr-3" />
                    </div>
                    <div className="text-xl text-white font-Saira mt-2 w-3/4">
                        {renderStoryWithLineBreaks(story)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chapter;