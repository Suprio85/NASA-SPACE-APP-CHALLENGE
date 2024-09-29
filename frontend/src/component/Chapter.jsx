import React from 'react';
import { Link } from 'react-router-dom';
import Button from './button';
const Chapter = ({ title, story, image,buttontext,Linkto, dir }) => {
    // Function to handle line breaks in the story content
    const renderStoryWithLineBreaks = (story) => {
        return story.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="mx-60 mt-60">
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
                {
                    Linkto === undefined ? null : <div className="mt-10">
                    <Link to={Linkto}><Button text={buttontext} /></Link>
                </div>
                }
                   
            </div>
        </div>
    );
};
export default Chapter;