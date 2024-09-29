import React from "react";
import { useState } from "react";
import story_bg_1 from "../assets/story_bg_1.png";
import OrbitName from "../component/orbitName";
import char2 from "../assets/SVG/char2.svg";

const chapter = ({ props }) => {
    return (
        <div>
            <div>
                <div className="text-3xl text-white font-Saira h-screen">{props.title}</div>
            </div>

        </div>

    )
}
const JourneyWithorbit = () => {
    return (
        <dib className="absolute top-0  w-full">
            <div>
            <div className="absolute w-full  overflow-x-hidden -z-40">
                <img src={story_bg_1} alt="story_bg_1 " className="" />
            </div>
            <div className="flex mx-60 justify-center items-center">
                <div className="w-full">
                    <img src={char2} alt="char2" className="w-3/4 " />
                </div>
                <div className=" flex flex-col justify-center  items-start  text-3xl text-white font-Saira h-screen">
                    <div className=" flex justify-center items-center">Hey there, space explorers! I’m <div className="w-24 mx-2"><OrbitName /></div>,</div>
                    <div>your guide to the stars. Today, I’m going to tell you a story about exoplanets—planets that exist outside our solar system. Buckle up, because we’re about to embark on an exciting journey across the galaxy!</div>
                </div>
            </div>
            </div>
        </dib>
    )
}
export default JourneyWithorbit;